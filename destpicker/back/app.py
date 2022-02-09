

# TODO: create a dedicated type object for config
from typing import Dict

from flask import Flask, request, jsonify
from flask_cors import CORS

import settings
from picker.usecase import order_possible_destinations
from picker.repo import GoogleClient


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.route("/ping")
    def ping():
        print("ping requested")
        return "pong"

    @app.route("/")
    def home():
        print("home")
        return "home"

    @app.route("/destpicker", methods=['POST'])
    def destpicker():
        data = request.json
        print('data', data)
        google_client = GoogleClient(key=settings.API_KEY)
        result = order_possible_destinations(google_client, None, None)

        # TODO serialize
        print(result)
        return jsonify(result)

    return app


if __name__ == "__main__":
    create_app().run(debug=True, host="0.0.0.0")
