import jwt
from functools import wraps
from flask import request, jsonify, current_app
from app.models import User
from app import db

def generate_token(user):
    payload = {
        "user_id": user.id,
        "role": user.role
    }
    return jwt.encode(payload, current_app.config['JWT_SECRET'], algorithm="HS256")

def decode_token(token):
    try:
        return jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        data = decode_token(token)
        if not data:
            return jsonify({"message": "Invalid token!"}), 401
        user = db.session.get(User, data['user_id'])
        if not user:
            return jsonify({"message": "User not found!"}), 401
        return f(current_user=user, *args, **kwargs)
    return decorated

def roles_required(*roles):
    def decorator(f):
        @wraps(f)
        def wrapper(current_user, *args, **kwargs):
            if current_user.role not in roles:
                return jsonify({"message": "Permission denied!"}), 403
            return f(current_user=current_user, *args, **kwargs)
        return wrapper
    return decorator
