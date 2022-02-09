

from typing import Dict, List

from destpicker.back.model import Destination, Participant, TransitSummary


def order_possible_destinations(participants: List[Participant], destinations: List[Destination]) -> Dict[Destination, TransitSummary]:
    # gmap