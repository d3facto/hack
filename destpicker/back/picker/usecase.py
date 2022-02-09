
from typing import Dict, List

from .model import Destination, Participant, TransitSummary
from .repo import Client


def order_possible_destinations(client: Client, participants: List[Participant], destinations: List[Destination]) -> Dict[Destination, TransitSummary]:
    return client.retrieve_journeys(participants, destinations)