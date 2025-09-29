# backend/app/config.py
from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017/callcenter_saas"
    DATABASE_NAME: str = "callcenter_saas"
    
    # Security
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production"
    JWT_SECRET_KEY: str = "your-jwt-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Email
    EMAIL_HOST: str = "smtp.gmail.com"
    EMAIL_PORT: int = 587
    EMAIL_USER: str = ""
    EMAIL_PASSWORD: str = ""
    EMAIL_FROM: str = "noreply@callcenter-saas.com"
    EMAIL_FROM_NAME: str = "CallCenter SaaS"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yourdomain.com"
    ]
    
    # Environment
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"

settings = Settings()