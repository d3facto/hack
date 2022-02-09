from typing import Dict, List
import googlemaps

from picker.model import Destination, Journey, Participant


class Client:
    def retrieve_journeys(self, participants: List[Participant], destinations: List[Destination]):
        raise Exception("not implemented")

class GoogleClient():
    def __init__(self, key: str):
        self.client = googlemaps.Client(key)

    def retrieve_journeys(self, participants: List[Participant], destinations: List[Destination]) -> List[Journey]:
        origins = [participant.address for participant in participants]
        dests = [destination.address for destination in destinations]

        results = self.client.distance_matrix(origins, dests)

        if results['status'] != 'OK': 
            raise Exception("google api returned an error", results)
        
        if len(results['rows']) != len(origins):
            raise Exception("google didn't return the same number of rows than our or")
        
        journeys = [] 
        
        for i, row in enumerate(results['rows']): 
            for j, elt in enumerate(row["elements"]):
                if elt['status'] != 'OK':
                    continue
                journeys.append(Journey(participant=participants[i], destination=destinations[j], duration_second=elt['duration']['value'], distance_meter=elt['distance']['value']))

        return journeys
            
