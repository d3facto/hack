
from typing import Dict, List

from picker.model import Destination, Participant, TransitSummary
from picker.repo import Client


def order_possible_destinations(client: Client, participants: List[Participant], destinations: List[Destination]) -> Dict[Destination, TransitSummary]:
    journeys = client.retrieve_journeys(participants, destinations)
    return None
