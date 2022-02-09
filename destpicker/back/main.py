from picker.model import Destination, Participant
from picker.repo import GoogleClient
from picker.usecase import order_possible_destinations
import pprint

client= GoogleClient("AIzaSyBAyfvBsj62KWobGUvNsG7WrlwWNiZuPFM", mode="transit")

participants = [
  Participant("Eric", "Montpellier"),
  Participant("Antoine", "Lyon"),

]

destinations = [
  Destination("Lyon", "Lyon"),
  Destination("Paris", "Paris"),
  Destination("Limoges", "Limoges"),
  Destination("Aurillac", "Aurillac"),
  Destination("Clermont-Ferrand", "Clermont-Ferrand"),
  Destination("Saint Etienne", "Saint-Etienne"),
  Destination("Rodez", "Rodez"),
  Destination("Brive-la-Gaillarde", "Brive-la-Gaillarde"),
  Destination("Toulouse", "Toulouse"),
]


pprint.pprint(order_possible_destinations(client, participants, destinations))