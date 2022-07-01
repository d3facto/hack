API_KEY = None

try:
    from local_settings import *  # noqa: F403,F401
except ModuleNotFoundError:
    print("No local-settings")
