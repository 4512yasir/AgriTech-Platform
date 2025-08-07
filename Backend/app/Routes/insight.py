from flask import Blueprint, jsonify
from app.utilis.auth import token_required

bp = Blueprint("insights", __name__, url_prefix="/api/insights")

# Static demo weather forecast
@bp.route("/weather", methods=["GET"])
@token_required
def get_weather(current_user):
    # You can later replace this with a real API call
    return jsonify({
        "location": "Nakuru",
        "forecast": [
            {"day": "Monday", "temp": "24°C", "condition": "Sunny"},
            {"day": "Tuesday", "temp": "22°C", "condition": "Partly Cloudy"},
            {"day": "Wednesday", "temp": "21°C", "condition": "Rain"},
        ]
    })

# Static market prices
@bp.route("/market-prices", methods=["GET"])
@token_required
def get_market_prices(current_user):
    return jsonify([
        {"product": "Maize", "unit": "90kg bag", "price": 2800, "location": "Eldoret"},
        {"product": "Beans", "unit": "90kg bag", "price": 7200, "location": "Nairobi"},
        {"product": "Tomatoes", "unit": "crate", "price": 1300, "location": "Meru"},
    ])
