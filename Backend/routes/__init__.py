from flask import Blueprint

# Import all route blueprints
from .auth import auth_bp
from .user import user_bp
from .listing import listing_bp
from .order import order_bp
from .loans import loans_bp
from .training import training_bp

# Create a single Blueprint to hold all sub-blueprints
api_bp = Blueprint("api", __name__, url_prefix="/api")

# Register each blueprint
api_bp.register_blueprint(auth_bp)
api_bp.register_blueprint(user_bp)
api_bp.register_blueprint(listing_bp)
api_bp.register_blueprint(order_bp)
api_bp.register_blueprint(loans_bp)
api_bp.register_blueprint(training_bp)
