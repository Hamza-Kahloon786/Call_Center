# # backend/app/main.py
# from fastapi import FastAPI, HTTPException, Request, Response
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from fastapi.staticfiles import StaticFiles
# from contextlib import asynccontextmanager
# from motor.motor_asyncio import AsyncIOMotorClient
# import traceback

# from app.config import settings
# from app.database import connect_to_mongo, close_mongo_connection
# from app.api.v1 import auth, users, admin, demo

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Startup
#     print("Starting up CallCenter SaaS API...")
#     await connect_to_mongo()
#     print("MongoDB connected successfully")
#     yield
#     # Shutdown
#     print("Shutting down...")
#     await close_mongo_connection()

# app = FastAPI(
#     title="CallCenter SaaS API",
#     description="AI-powered call center automation platform",
#     version="1.0.0",
#     lifespan=lifespan
# )

# # Custom middleware to handle OPTIONS requests properly
# @app.middleware("http")
# async def custom_cors_middleware(request: Request, call_next):
#     if request.method == "OPTIONS":
#         response = Response()
#         response.headers["Access-Control-Allow-Origin"] = "*"
#         response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
#         response.headers["Access-Control-Allow-Headers"] = "*"
#         response.headers["Access-Control-Allow-Credentials"] = "true"
#         response.status_code = 200
#         return response
    
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     return response

# # Also keep the standard CORS middleware as backup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins for now
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Global exception handler for better debugging
# @app.exception_handler(Exception)
# async def global_exception_handler(request, exc):
#     print(f"Global exception: {str(exc)}")
#     print(f"Traceback: {traceback.format_exc()}")
#     return JSONResponse(
#         status_code=500,
#         content={"error": f"Internal server error: {str(exc)}"}
#     )

# # Include routers
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
# app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
# app.include_router(demo.router, prefix="/api/v1/demo", tags=["demo"])

# @app.get("/")
# async def root():
#     return {"message": "CallCenter SaaS API is running!", "status": "ok"}

# @app.get("/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "healthy", "message": "API is running"}

# # Test endpoint to verify CORS
# @app.get("/test-cors")
# async def test_cors():
#     return {"message": "CORS test successful", "method": "GET"}

# @app.post("/test-cors")
# async def test_cors_post():
#     return {"message": "CORS POST test successful", "method": "POST"}

# # Quick Admin User Creation (for development only)
# @app.post("/create-admin-user")
# async def create_admin_user_endpoint():
#     """Create admin user - REMOVE THIS IN PRODUCTION"""
#     from app.database import get_collection
#     from app.core.security import get_password_hash
#     from bson import ObjectId
#     from datetime import datetime
    
#     try:
#         users_collection = await get_collection("users")
        
#         # Check if admin already exists
#         existing_admin = await users_collection.find_one({"email": "admin@callcenterpro.com"})
#         if existing_admin:
#             return {"message": "Admin user already exists", "email": "admin@callcenterpro.com"}
        
#         admin_user = {
#             "_id": str(ObjectId()),
#             "email": "admin@callcenterpro.com",
#             "full_name": "System Administrator",
#             "company": "CallCenter Pro",
#             "phone": "+1-555-ADMIN",
#             "hashed_password": get_password_hash("admin123"),
#             "is_active": True,
#             "is_verified": True,
#             "is_admin": True,
#             "subscription_plan": "enterprise",
#             "created_at": datetime.utcnow(),
#             "updated_at": datetime.utcnow()
#         }
        
#         result = await users_collection.insert_one(admin_user)
        
#         if result.inserted_id:
#             return {
#                 "message": "âœ… Admin user created successfully!",
#                 "email": "admin@callcenterpro.com",
#                 "password": "admin123",
#                 "note": "Please change password after first login"
#             }
#         else:
#             raise HTTPException(
#                 status_code=500,
#                 detail="Failed to create admin user"
#             )
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error creating admin user: {str(e)}"
#         )

# # Keep your existing endpoints...
# @app.post("/create-user")
# async def create_sample_user():
#     """Create a sample user in the database"""
#     try:
#         mongodb_url = getattr(settings, 'MONGODB_URL', None) or getattr(settings, 'mongodb_url', None)
#         if not mongodb_url:
#             raise HTTPException(status_code=500, detail="No MongoDB URL found")
        
#         # Extract database name
#         target_db_name = "callcenter_saas"
#         try:
#             if '/' in mongodb_url and '?' in mongodb_url:
#                 target_db_name = mongodb_url.split('/')[-1].split('?')[0]
#         except:
#             pass
        
#         client = AsyncIOMotorClient(mongodb_url)
#         db = client[target_db_name]
        
#         # Create users collection
#         users_collection = db.users
        
#         # Sample user data
#         sample_user = {
#             "username": "john_doe",
#             "email": "john@example.com",
#             "full_name": "John Doe",
#             "role": "agent",
#             "department": "customer_service",
#             "created_at": "2024-11-14T10:00:00Z",
#             "is_active": True,
#             "phone": "+1-555-0123"
#         }
        
#         result = await users_collection.insert_one(sample_user)
        
#         # Get updated database info
#         db_list = await client.list_database_names()
#         collections = await db.list_collection_names()
        
#         client.close()
        
#         return {
#             "status": "success",
#             "message": "Sample user created successfully",
#             "user_id": str(result.inserted_id),
#             "database_name": target_db_name,
#             "all_databases": db_list,
#             "collections": collections
#         }
        
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

# @app.get("/test-db")
# async def test_database_connection():
#     """Test MongoDB connection endpoint"""
#     try:
#         # Get the MongoDB URL from settings
#         mongodb_url = getattr(settings, 'mongodb_url', None) or \
#                      getattr(settings, 'MONGODB_URL', None) or \
#                      getattr(settings, 'MONGO_URI', None) or \
#                      getattr(settings, 'MONGODB_URI', None)
        
#         if not mongodb_url:
#             raise HTTPException(
#                 status_code=500,
#                 detail="No MongoDB URL found in configuration"
#             )
        
#         # Extract database name from URL
#         target_db_name = "Unknown"
#         try:
#             if '/' in mongodb_url and '?' in mongodb_url:
#                 target_db_name = mongodb_url.split('/')[-1].split('?')[0]
#             elif '/' in mongodb_url:
#                 target_db_name = mongodb_url.split('/')[-1]
#         except:
#             pass
        
#         # Create a MongoDB client
#         client = AsyncIOMotorClient(mongodb_url)
        
#         # Test the connection
#         await client.admin.command('ping')
        
#         # List all databases
#         db_list = await client.list_database_names()
        
#         # Test access to target database
#         collections_in_target = []
        
#         if target_db_name != "Unknown":
#             try:
#                 target_db = client[target_db_name]
#                 collections_in_target = await target_db.list_collection_names()
#             except Exception as e:
#                 collections_in_target = [f"Error accessing: {str(e)}"]
        
#         # Get server info
#         server_info = await client.admin.command('buildinfo')
        
#         # Close the connection
#         client.close()
        
#         return {
#             "status": "success",
#             "message": "Database connection successful",
#             "mongodb_url": mongodb_url[:30] + "..." if len(mongodb_url) > 30 else mongodb_url,
#             "target_database": target_db_name,
#             "target_database_collections": collections_in_target,
#             "all_databases": db_list,
#             "mongodb_version": server_info.get('version', 'Unknown'),
#             "connection_test": "âœ… Connected successfully",
#             "note": "Empty databases don't appear in the database list until they have collections with data"
#         }
        
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Database connection failed: {str(e)}"
#         )


# backend/app/main.py
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
import traceback

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.api.v1 import auth, users, admin, demo

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up CallCenter SaaS API...")
    await connect_to_mongo()
    print("MongoDB connected successfully")
    yield
    # Shutdown
    print("Shutting down...")
    await close_mongo_connection()

app = FastAPI(
    title="CallCenter SaaS API",
    description="AI-powered call center automation platform",
    version="1.0.0",
    lifespan=lifespan
)

# Custom middleware to handle OPTIONS requests properly
@app.middleware("http")
async def custom_cors_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
        response.headers["Access-Control-Allow-Headers"] = "*"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.status_code = 200
        return response
    
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# Also keep the standard CORS middleware as backup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler for better debugging
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    print(f"Global exception: {str(exc)}")
    print(f"Traceback: {traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal server error: {str(exc)}"}
    )

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(demo.router, prefix="/api/v1/demo", tags=["demo"])

@app.get("/")
async def root():
    return {"message": "CallCenter SaaS API is running!", "status": "ok"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

# Test endpoint to verify CORS
@app.get("/test-cors")
async def test_cors():
    return {"message": "CORS test successful", "method": "GET"}

@app.post("/test-cors")
async def test_cors_post():
    return {"message": "CORS POST test successful", "method": "POST"}

# Development/testing endpoints
@app.post("/create-user")
async def create_sample_user():
    """Create a sample user in the database"""
    try:
        mongodb_url = getattr(settings, 'MONGODB_URL', None) or getattr(settings, 'mongodb_url', None)
        if not mongodb_url:
            raise HTTPException(status_code=500, detail="No MongoDB URL found")
        
        # Extract database name
        target_db_name = "callcenter_saas"
        try:
            if '/' in mongodb_url and '?' in mongodb_url:
                target_db_name = mongodb_url.split('/')[-1].split('?')[0]
        except:
            pass
        
        client = AsyncIOMotorClient(mongodb_url)
        db = client[target_db_name]
        
        # Create users collection
        users_collection = db.users
        
        # Sample user data
        sample_user = {
            "username": "john_doe",
            "email": "john@example.com",
            "full_name": "John Doe",
            "role": "agent",
            "department": "customer_service",
            "created_at": "2024-11-14T10:00:00Z",
            "is_active": True,
            "phone": "+1-555-0123"
        }
        
        result = await users_collection.insert_one(sample_user)
        
        # Get updated database info
        db_list = await client.list_database_names()
        collections = await db.list_collection_names()
        
        client.close()
        
        return {
            "status": "success",
            "message": "Sample user created successfully",
            "user_id": str(result.inserted_id),
            "database_name": target_db_name,
            "all_databases": db_list,
            "collections": collections
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@app.get("/test-db")
async def test_database_connection():
    """Test MongoDB connection endpoint"""
    try:
        # Get the MongoDB URL from settings
        mongodb_url = getattr(settings, 'mongodb_url', None) or \
                     getattr(settings, 'MONGODB_URL', None) or \
                     getattr(settings, 'MONGO_URI', None) or \
                     getattr(settings, 'MONGODB_URI', None)
        
        if not mongodb_url:
            raise HTTPException(
                status_code=500,
                detail="No MongoDB URL found in configuration"
            )
        
        # Extract database name from URL
        target_db_name = "Unknown"
        try:
            if '/' in mongodb_url and '?' in mongodb_url:
                target_db_name = mongodb_url.split('/')[-1].split('?')[0]
            elif '/' in mongodb_url:
                target_db_name = mongodb_url.split('/')[-1]
        except:
            pass
        
        # Create a MongoDB client
        client = AsyncIOMotorClient(mongodb_url)
        
        # Test the connection
        await client.admin.command('ping')
        
        # List all databases
        db_list = await client.list_database_names()
        
        # Test access to target database
        collections_in_target = []
        
        if target_db_name != "Unknown":
            try:
                target_db = client[target_db_name]
                collections_in_target = await target_db.list_collection_names()
            except Exception as e:
                collections_in_target = [f"Error accessing: {str(e)}"]
        
        # Get server info
        server_info = await client.admin.command('buildinfo')
        
        # Close the connection
        client.close()
        
        return {
            "status": "success",
            "message": "Database connection successful",
            "mongodb_url": mongodb_url[:30] + "..." if len(mongodb_url) > 30 else mongodb_url,
            "target_database": target_db_name,
            "target_database_collections": collections_in_target,
            "all_databases": db_list,
            "mongodb_version": server_info.get('version', 'Unknown'),
            "connection_test": "âœ… Connected successfully",
            "note": "Empty databases don't appear in the database list until they have collections with data"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(e)}"
        )