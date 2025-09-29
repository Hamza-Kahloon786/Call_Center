# backend/app/api/v1/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.models.user import UserInDB
from app.schemas.user import UserUpdate, UserResponse
from app.api.deps import get_current_active_user
from app.database import get_collection
from app.utils.helpers import format_user_response
from app.core.security import verify_password, get_password_hash
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models for email and password changes
class EmailChangeRequest(BaseModel):
    new_email: EmailStr
    current_password: str

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Get current user information"""
    return format_user_response(current_user.dict())

@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Update current user information"""
    try:
        users_collection = await get_collection("users")
        
        update_data = {k: v for k, v in user_update.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No data provided for update"
            )
        
        update_data["updated_at"] = datetime.utcnow()
        
        result = await users_collection.update_one(
            {"_id": current_user.id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update user"
            )
        
        # Get updated user
        updated_user = await users_collection.find_one({"_id": current_user.id})
        return format_user_response(updated_user)
        
    except Exception as e:
        logger.error(f"Error updating user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update user: {str(e)}"
        )

@router.put("/me/email")
async def change_user_email(
    email_request: EmailChangeRequest,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Change user email address"""
    try:
        logger.info(f"User {current_user.email} requesting email change to {email_request.new_email}")
        
        # Verify current password
        if not verify_password(email_request.current_password, current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )
        
        # Check if new email is already in use
        users_collection = await get_collection("users")
        existing_user = await users_collection.find_one({"email": email_request.new_email})
        if existing_user and str(existing_user["_id"]) != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address is already in use"
            )
        
        # Update email
        result = await users_collection.update_one(
            {"_id": current_user.id},
            {
                "$set": {
                    "email": email_request.new_email,
                    "is_verified": False,  # Require re-verification for new email
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update email"
            )
        
        logger.info(f"Successfully changed email for user {current_user.email} to {email_request.new_email}")
        
        return {
            "message": "Email address updated successfully",
            "new_email": email_request.new_email,
            "verification_required": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error changing email for user {current_user.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to change email: {str(e)}"
        )

@router.put("/me/password")
async def change_user_password(
    password_request: PasswordChangeRequest,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Change user password"""
    try:
        logger.info(f"User {current_user.email} requesting password change")
        
        # Verify current password
        if not verify_password(password_request.current_password, current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )
        
        # Validate new password
        if len(password_request.new_password) < 8:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password must be at least 8 characters long"
            )
        
        # Check if new password is different from current
        if verify_password(password_request.new_password, current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password must be different from current password"
            )
        
        # Hash new password
        new_hashed_password = get_password_hash(password_request.new_password)
        
        # Update password
        users_collection = await get_collection("users")
        result = await users_collection.update_one(
            {"_id": current_user.id},
            {
                "$set": {
                    "hashed_password": new_hashed_password,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update password"
            )
        
        logger.info(f"Successfully changed password for user {current_user.email}")
        
        return {
            "message": "Password updated successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error changing password for user {current_user.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to change password: {str(e)}"
        )

@router.delete("/me")
async def delete_current_user(
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Deactivate current user account"""
    try:
        users_collection = await get_collection("users")
        
        result = await users_collection.update_one(
            {"_id": current_user.id},
            {
                "$set": {
                    "is_active": False,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to deactivate account"
            )
        
        return {"message": "Account deactivated successfully"}
        
    except Exception as e:
        logger.error(f"Error deactivating account for user {current_user.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to deactivate account: {str(e)}"
        )