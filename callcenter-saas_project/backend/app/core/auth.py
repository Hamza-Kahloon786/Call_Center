# backend/app/core/auth.py
from fastapi import HTTPException, status
from app.database import get_collection
from app.models.user import UserInDB
from app.core.security import verify_password
from typing import Optional
from bson import ObjectId

async def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    """Authenticate user with email and password"""
    users_collection = await get_collection("users")
    user_doc = await users_collection.find_one({"email": email})
    
    if not user_doc:
        return None
    
    user = UserInDB(**user_doc)
    if not verify_password(password, user.hashed_password):
        return None
    
    return user

async def get_user_by_email(email: str) -> Optional[UserInDB]:
    """Get user by email"""
    users_collection = await get_collection("users")
    user_doc = await users_collection.find_one({"email": email})
    
    if user_doc:
        return UserInDB(**user_doc)
    return None

async def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    """Get user by ID"""
    try:
        print(f"Looking up user by ID: {user_id}")
        users_collection = await get_collection("users")
        
        # First try as ObjectId (which is what your database actually uses)
        user_doc = None
        if ObjectId.is_valid(user_id):
            user_doc = await users_collection.find_one({"_id": ObjectId(user_id)})
            print(f"Searched for ObjectId({user_id})")
        
        # If not found, try as string (fallback for any string IDs)
        if not user_doc:
            user_doc = await users_collection.find_one({"_id": user_id})
            print(f"Searched for string ID: {user_id}")
        
        if user_doc:
            print(f"Found user: {user_doc.get('email', 'No email')}")
            return UserInDB(**user_doc)
        else:
            print(f"User not found with ID: {user_id}")
            return None
            
    except Exception as e:
        print(f"Error in get_user_by_id: {str(e)}")
        return None