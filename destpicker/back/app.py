

# TODO: create a dedicated type object for config
from dataclasses import asdict
from typing import Dict

from flask import Flask, request, jsonify
from flask_cors import CORS

import settings
from picker.model import Participant, Destination
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
        participants = [Participant(**p) for p in data['participants']]
        destinations = [Destination(**d) for d in data['destinations']]
        mode = data.get("mode") or "transit"
        google_client = GoogleClient(key=settings.API_KEY, mode=mode)
        result = order_possible_destinations(google_client, participants, destinations)

        # TODO serialize
        print(result)

        return jsonify([asdict(j) for j in result])

    return app


if __name__ == "__main__":
    create_app().run(debug=True, host="0.0.0.0")
