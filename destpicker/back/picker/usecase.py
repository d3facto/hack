
import statistics
from typing import Dict, List

from .model import Destination, Journey, Participant, TransitSummary
from .repo import Client


def order_possible_destinations(client: Client, participants: List[Participant], destinations: List[Destination]) -> List[TransitSummary]:
    journeys = client.retrieve_journeys(participants, destinations)
    return _create_transit_summary_per_dest(journeys)


def _create_transit_summary_per_dest(journeys: List[Journey]) -> List[TransitSummary]:
    journeys_by_dest = {}
    for journey in journeys:
        if journey.destination.name not in journeys_by_dest:
            journeys_by_dest[journey.destination.name] = {'journeys': [], 'destination': journey.destination}    
        journeys_by_dest[journey.destination.name]['journeys'].append(journey)


    summaries = []
    for destname, destandjour in journeys_by_dest.items():
        durations = [jour.duration_second for jour in destandjour['journeys']]
        distances = [jour.distance_meter for jour in destandjour['journeys']]
        summaries.append(TransitSummary(
            average_duration_second=round(statistics.mean(durations),2),
            average_distance_meter=round(statistics.mean(distances)),
            max_duration_second=max(durations),
            max_distance_meter=max(distances),
            destination=destandjour['destination'],
            journeys=journeys
        ))
    return summaries

