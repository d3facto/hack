# TODO: create a dedicated type object for config
import os

import requests
from flask import Flask, jsonify, redirect, request, url_for
from flask_cors import CORS
from flask_login import (LoginManager, current_user, login_required,
                         login_user, logout_user)
from oauthlib.oauth2 import WebApplicationClient

from hardcoded import USER_SAMPLE

STRAVA_CLIENT_ID = os.environ.get("STRAVA_CLIENT_ID")
STRAVA_CLIENT_SECRET = os.environ.get("STRAVA_CLIENT_SECRET")
STRAVA_AUTHORIZATION_URL = "https://www.strava.com/oauth/authorize"
STRAVA_TOKEN_ENDPOINT = "https://www.strava.com/oauth/token"

FRONTEND_URL = "http://localhost:3000/"


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    client = WebApplicationClient(STRAVA_CLIENT_ID)

    login_manager = LoginManager()
    login_manager.init_app(app)

    @app.route("/login")
    def login():
        app.logger.info("Login to Strava")

        request_uri = client.prepare_request_uri(
            STRAVA_AUTHORIZATION_URL,
            redirect_uri=f"{request.base_url}/callback",
            scope=["read"],
        )

        return redirect(request_uri)

    @app.route("/login/callback")
    def login_callback():
        code = request.args.get("code")

        app.logger.info(f"Getting token and refresh token using code {code}")

        token_url, headers, body = client.prepare_token_request(
            STRAVA_TOKEN_ENDPOINT,
            authorization_response=request.url.replace("http", "https"),
            redirect_url=request.base_url.replace("http", "https"),
            code=code
        )

        params = {
            "client_id": STRAVA_CLIENT_ID,
            "client_secret": STRAVA_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
        }

        app.logger.info(f"Getting token and refresh token from {token_url} with headers {headers} and data {body}")

        token_response = requests.post(
            token_url,
            headers=headers,
            params=params,
            auth=(STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET),
        )

        res = token_response.json()

        app.logger.info(f"Received {res}")

        user_id = res["athlete"]["id"]

        return redirect(f"{FRONTEND_URL}?user_id={user_id}")

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
    create_app().run(debug=True, host="0.0.0.0", port=8080)
