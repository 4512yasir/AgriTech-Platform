from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
import os

# Load env vars
load_dotenv()

from models import db, User, Product, Order, Loan, Training, Meeting, Minute  # ✅ Only import db once here

app = Flask(__name__)
CORS(app)

# Config from .env
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv("JWT_EXP_DELTA_SECONDS", 3600))

# Initialize extensions
db.init_app(app)  # ✅ Initialize db with the app here
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Import Blueprints
from routes import auth_bp, user_bp, listing_bp, order_bp, training_bp, loans_bp

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(listing_bp)
app.register_blueprint(order_bp)
app.register_blueprint(training_bp)
app.register_blueprint(loans_bp)

if __name__ == "__main__":
    app.run(debug=True)
