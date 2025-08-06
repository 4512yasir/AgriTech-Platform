from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models import User

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            identity = get_jwt_identity()
            user = User.query.get(identity["id"])
            if not user:
                return jsonify({"error": "User not found"}), 404
            return f(user, *args, **kwargs)
        except Exception as e:
            return jsonify({"error": str(e)}), 401
    return decorated_function

def roles_required(allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            if current_user.role not in allowed_roles:
                return jsonify({"error": "Access denied. Insufficient permissions."}), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator
