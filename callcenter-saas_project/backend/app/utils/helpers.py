# backend/app/utils/helpers.py
from typing import Dict, Any, Optional
import re
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

def validate_phone_number(phone: str) -> bool:
    """Validate phone number format"""
    if not phone:
        return True  # Phone is optional
    
    # Remove common separators
    cleaned_phone = re.sub(r'[\s\-\(\)\+]', '', phone)
    
    # Check if it contains only digits and is reasonable length
    pattern = r'^\d{10,15}$'
    return bool(re.match(pattern, cleaned_phone))

def sanitize_string(text: str, max_length: int = 255) -> str:
    """Sanitize string input"""
    if not text:
        return ""
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    # Truncate if too long
    if len(text) > max_length:
        text = text[:max_length]
    
    return text.strip()

def format_user_response(user_doc: Dict[str, Any]) -> Dict[str, Any]:
    """Format user document for API response"""
    try:
        # Handle both string and ObjectId for _id
        user_id = str(user_doc.get("_id", ""))
        
        # Format dates properly
        created_at = user_doc.get("created_at")
        if isinstance(created_at, str):
            try:
                created_at = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            except ValueError:
                created_at = None
        elif not isinstance(created_at, datetime):
            created_at = None
            
        last_login = user_doc.get("last_login")
        if isinstance(last_login, str):
            try:
                last_login = datetime.fromisoformat(last_login.replace('Z', '+00:00'))
            except ValueError:
                last_login = None
        elif not isinstance(last_login, datetime):
            last_login = None

        user_response = {
            "id": user_id,
            "email": user_doc.get("email", ""),
            "full_name": user_doc.get("full_name", ""),
            "company": user_doc.get("company"),
            "phone": user_doc.get("phone"),
            "is_active": user_doc.get("is_active", True),
            "is_verified": user_doc.get("is_verified", False),
            "is_admin": user_doc.get("is_admin", False),
            "subscription_plan": user_doc.get("subscription_plan", "free"),
            "created_at": created_at.isoformat() if created_at else None,
            "last_login": last_login.isoformat() if last_login else None
        }
        
        # Remove None values except for optional fields that should be None
        filtered_response = {}
        for key, value in user_response.items():
            if value is not None or key in ['company', 'phone', 'last_login']:
                filtered_response[key] = value
        
        return filtered_response
        
    except Exception as e:
        logger.error(f"Error formatting user response: {str(e)}")
        logger.error(f"User doc: {user_doc}")
        
        # Return minimal safe response
        return {
            "id": str(user_doc.get("_id", "")),
            "email": user_doc.get("email", "unknown@example.com"),
            "full_name": user_doc.get("full_name", "Unknown User"),
            "company": None,
            "phone": None,
            "is_active": user_doc.get("is_active", True),
            "is_verified": user_doc.get("is_verified", False),
            "is_admin": user_doc.get("is_admin", False),
            "subscription_plan": user_doc.get("subscription_plan", "free"),
            "created_at": None,
            "last_login": None
        }

def generate_mock_stats() -> Dict[str, Any]:
    """Generate mock statistics for dashboard"""
    import random
    from datetime import datetime, timedelta
    
    today = datetime.now()
    
    return {
        # Call statistics (mock for now)
        "calls_today": random.randint(15, 45),
        "calls_this_week": random.randint(100, 300),
        "calls_this_month": random.randint(400, 1200),
        "total_calls_all_time": random.randint(5000, 15000),
        
        # Performance metrics (mock)
        "success_rate": round(random.uniform(75, 95), 1),
        "conversion_rate": round(random.uniform(12, 25), 1),
        "avg_call_duration": f"{random.randint(2, 8)}:{random.randint(10, 59):02d}",
        
        # Revenue metrics (mock)
        "revenue_today": round(random.uniform(500, 2000), 2),
        "revenue_this_month": round(random.uniform(15000, 45000), 2),
        "revenue_all_time": round(random.uniform(100000, 500000), 2),
        
        # System metrics (mock)
        "active_campaigns": random.randint(3, 8),
        "system_uptime": "99.9%",
        "api_response_time": f"{random.randint(45, 120)}ms",
        
        # Activity data (mock)
        "top_performing_agent": "AI Agent Alpha",
        "recent_activity": [
            {
                "id": 1,
                "time": (today - timedelta(minutes=random.randint(5, 60))).strftime("%H:%M"),
                "activity": "Call completed successfully",
                "client": f"Client {random.randint(1, 100)}",
                "type": "success"
            },
            {
                "id": 2,
                "time": (today - timedelta(minutes=random.randint(60, 120))).strftime("%H:%M"),
                "activity": "Demo booking received",
                "client": f"Company {random.randint(1, 50)}",
                "type": "info"
            },
            {
                "id": 3,
                "time": (today - timedelta(minutes=random.randint(120, 180))).strftime("%H:%M"),
                "activity": "New user registered",
                "client": f"User {random.randint(1, 200)}",
                "type": "info"
            },
            {
                "id": 4,
                "time": (today - timedelta(minutes=random.randint(180, 240))).strftime("%H:%M"),
                "activity": "Payment received",
                "client": f"Customer {random.randint(1, 100)}",
                "type": "success"
            }
        ]
    }

def format_demo_booking_response(demo_doc: Dict[str, Any]) -> Dict[str, Any]:
    """Format demo booking document for API response"""
    try:
        # Handle dates
        created_at = demo_doc.get("created_at")
        if isinstance(created_at, str):
            try:
                created_at = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            except ValueError:
                created_at = None
        elif not isinstance(created_at, datetime):
            created_at = None
            
        updated_at = demo_doc.get("updated_at")
        if isinstance(updated_at, str):
            try:
                updated_at = datetime.fromisoformat(updated_at.replace('Z', '+00:00'))
            except ValueError:
                updated_at = None
        elif not isinstance(updated_at, datetime):
            updated_at = None

        return {
            "id": str(demo_doc.get("_id", "")),
            "full_name": demo_doc.get("full_name", ""),
            "email": demo_doc.get("email", ""),
            "company": demo_doc.get("company", ""),
            "phone": demo_doc.get("phone", ""),
            "message": demo_doc.get("message"),
            "preferred_date": demo_doc.get("preferred_date"),
            "preferred_time": demo_doc.get("preferred_time"),
            "status": demo_doc.get("status", "pending"),
            "created_at": created_at.isoformat() if created_at else None,
            "updated_at": updated_at.isoformat() if updated_at else None
        }
        
    except Exception as e:
        logger.error(f"Error formatting demo booking response: {str(e)}")
        return {
            "id": str(demo_doc.get("_id", "")),
            "full_name": demo_doc.get("full_name", ""),
            "email": demo_doc.get("email", ""),
            "company": demo_doc.get("company", ""),
            "phone": demo_doc.get("phone", ""),
            "message": demo_doc.get("message"),
            "preferred_date": demo_doc.get("preferred_date"),
            "preferred_time": demo_doc.get("preferred_time"),
            "status": demo_doc.get("status", "pending"),
            "created_at": None,
            "updated_at": None
        }

def validate_user_data(user_data: Dict[str, Any]) -> Dict[str, str]:
    """Validate user data and return errors if any"""
    errors = {}
    
    # Required fields
    if not user_data.get("email"):
        errors["email"] = "Email is required"
    elif not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', user_data["email"]):
        errors["email"] = "Invalid email format"
    
    if not user_data.get("full_name"):
        errors["full_name"] = "Full name is required"
    elif len(user_data["full_name"]) < 2:
        errors["full_name"] = "Full name must be at least 2 characters"
    
    # Optional field validation
    if user_data.get("phone") and not validate_phone_number(user_data["phone"]):
        errors["phone"] = "Invalid phone number format"
    
    if user_data.get("company") and len(user_data["company"]) > 100:
        errors["company"] = "Company name too long (max 100 characters)"
    
    return errors

def calculate_user_metrics(users: list) -> Dict[str, Any]:
    """Calculate various metrics from user list"""
    if not users:
        return {
            "total": 0,
            "active": 0,
            "verified": 0,
            "admin": 0,
            "subscription_breakdown": {"free": 0, "professional": 0, "enterprise": 0},
            "registration_trend": []
        }
    
    total = len(users)
    active = sum(1 for u in users if u.get("is_active", True))
    verified = sum(1 for u in users if u.get("is_verified", False))
    admin = sum(1 for u in users if u.get("is_admin", False))
    
    # Subscription breakdown
    subscription_counts = {"free": 0, "professional": 0, "enterprise": 0}
    for user in users:
        plan = user.get("subscription_plan", "free")
        if plan in subscription_counts:
            subscription_counts[plan] += 1
    
    return {
        "total": total,
        "active": active,
        "inactive": total - active,
        "verified": verified,
        "admin": admin,
        "subscription_breakdown": subscription_counts,
        "verification_rate": round((verified / total * 100) if total > 0 else 0, 1),
        "admin_percentage": round((admin / total * 100) if total > 0 else 0, 1)
    }