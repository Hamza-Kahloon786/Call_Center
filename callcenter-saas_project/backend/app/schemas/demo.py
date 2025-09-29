# backend/app/schemas/demo.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class DemoBookingCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    message: Optional[str] = Field(None, max_length=500)
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None

class DemoBookingResponse(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    company: str
    phone: str
    message: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime