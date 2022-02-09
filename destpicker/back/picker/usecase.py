
from typing import Dict, List

from destpicker.back.picker.model import Destination, Participant, TransitSummary
from destpicker.back.picker.repo import Client


def order_possible_destinations(client: Client, participants: List[Participant], destinations: List[Destination]) -> Dict[Destination, TransitSummary]:
    client.retrieve_journeys(participants, destinations)