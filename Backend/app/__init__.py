from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    CORS(app)

    from .Routes import register_routes
    register_routes(app)

    # ⚠️ TEMPORARY: Create all tables when app starts
    with app.app_context():
        db.create_all()
        print("✅ Database tables created.")

    return app
