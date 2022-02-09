from dataclasses import dataclass
from typing import Dict, List

@dataclass
class Participant:
    name: str
    address: str

@dataclass
class Destination:
    name: str
    address: str

@dataclass
class Journey:
    participant: Participant
    destination: Destination
    distance_meter: int
    duration_second: int

@dataclass
class TransitSummary:
    destination: Destination
    average_duration_second: int
    average_distance_meter: float
    max_duration_second: int
    max_distance_meter: int
    journeys : List[Journey]


