

# TODO: create a dedicated type object for config
from typing import Dict

from flask import Flask
from flask_cors import CORS


def create_app(config: Dict[str, str] = None) -> Flask:
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
    return app


if __name__ == "__main__":
    create_app().run(debug=True, host="0.0.0.0")
