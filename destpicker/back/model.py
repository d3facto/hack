from dataclasses import dataclass
from typing import Dict, List

@dataclass
class Participant:
    address: str
    name: str

@dataclass
class Destination:
    name: str
    address: str

@dataclass
class Journey:
    distance_meter: int
    duration_second: int

@dataclass
class TransitSummary:
    averate_duration_second: int
    average_distance_meter: float
    max_duration_second: int
    max_distance_meter: int
    journeys : Dict[Participant, Journey]


