

# TODO: create a dedicated type object for config
from flask import Flask, jsonify
from flask_cors import CORS

from hardcoded import USER_SAMPLE


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

    @app.route("/users", methods=['GET'])
    def users():
        users = [
            USER_SAMPLE
        ]
        return jsonify(users)

    return app


if __name__ == "__main__":
    create_app().run(debug=True, host="0.0.0.0")
