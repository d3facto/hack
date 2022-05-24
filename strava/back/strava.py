import requests

API_URL = "https://www.strava.com/api/v3"


class StravaClient:

    def __init__(self, token: str):
        self.token = token

    @property
    def headers(self):
        return {"Authorization": f"Bearer {self.token}"}

    def get_user(self):
        get_resp = requests.get(
            f"{API_URL}/athlete",
            headers=self.headers
        )
        return get_resp.json()

    def get_user_stats(self):
        user_id = self.get_user()['id']
        get_resp = requests.get(
            f"{API_URL}/athletes/{user_id}/stats",
            headers=self.headers
        )
        return get_resp.json()