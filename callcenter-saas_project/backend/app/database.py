# database.py
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    database: AsyncIOMotorDatabase = None

db = Database()

async def get_database() -> AsyncIOMotorDatabase:
    return db.database

async def connect_to_mongo():
    """Create database connection"""
    logger.info("Connecting to MongoDB...")
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db.database = db.client[settings.DATABASE_NAME]
    logger.info("Connected to MongoDB!")

async def close_mongo_connection():
    """Close database connection"""
    logger.info("Closing connection to MongoDB...")
    if db.client:
        db.client.close()
    logger.info("Connection to MongoDB closed!")

async def get_collection(collection_name: str):
    """Get a specific collection"""
    return db.database[collection_name]