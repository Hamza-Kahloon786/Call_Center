# backend/app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100)

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    company: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool
    is_verified: bool
    is_admin: bool
    subscription_plan: str
    created_at: datetime
    last_login: Optional[datetime] = None

class UserInDBResponse(UserResponse):
    hashed_password: str