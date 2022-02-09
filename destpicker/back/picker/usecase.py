
from typing import Dict, List

from .model import Destination, Participant, Journey
from .repo import Client


def order_possible_destinations(client: Client, participants: List[Participant], destinations: List[Destination]) -> List[Journey]:
    return client.retrieve_journeys(participants, destinations)
