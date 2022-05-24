
from strava import StravaClient
import os


def test():
    hardcoded_token = os.environ.get('STRAVA_TOKEN')
    client = StravaClient(hardcoded_token)
    print(client.get_user())
    print(client.get_user_stats())


if __name__ == "__main__":
    test()