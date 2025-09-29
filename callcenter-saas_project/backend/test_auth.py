# reset_admin_password.py - Run this to fix the admin password
import asyncio
import motor.motor_asyncio
from passlib.context import CryptContext
from bson import ObjectId
import os
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def reset_admin_password():
    """Reset the admin password to a known value"""
    
    mongodb_url = 'mongodb+srv://maira:maira_12@cluster0.5sesguk.mongodb.net/callcenter_saas?retryWrites=true&w=majority&appName=Cluster0'
    database_name = "callcenter_saas"
    
    print("🔐 Resetting admin password...")
    
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(mongodb_url)
        db = client[database_name]
        users_collection = db.users
        
        # Find the admin user
        admin_user = await users_collection.find_one({"email": "admin@callcenter.com"})
        
        if not admin_user:
            print("❌ Admin user not found!")
            return
        
        print(f"✅ Found admin user: {admin_user['email']}")
        
        # Generate new password hash
        new_password = "admin123"
        new_hash = pwd_context.hash(new_password)
        
        print(f"🔐 Generated new hash: {new_hash[:30]}...")
        
        # Update the password
        result = await users_collection.update_one(
            {"email": "admin@callcenter.com"},
            {
                "$set": {
                    "hashed_password": new_hash,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count > 0:
            print("✅ Password updated successfully!")
            
            # Verify the new password works
            updated_user = await users_collection.find_one({"email": "admin@callcenter.com"})
            password_works = pwd_context.verify(new_password, updated_user['hashed_password'])
            
            if password_works:
                print("🎉 Password verification successful!")
                print("\n📝 LOGIN CREDENTIALS:")
                print("   Email: admin@callcenter.com")
                print("   Password: admin123")
                print("\n✅ You can now login with these credentials!")
            else:
                print("❌ Password verification failed!")
        else:
            print("❌ Failed to update password!")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(reset_admin_password())