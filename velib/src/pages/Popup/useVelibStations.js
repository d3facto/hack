import { useState } from 'react'

const STATIONS = [{
  station_id: 63279,
  name: 'Siam - La Pompe',
  lat: 48.861720329027264,
  lon: 2.275346568555312,
  capacity: 16,
  stationCode: '16017',
  distance: 0.000010876351452950346
},
{
  station_id: 38407,
  name: 'Flandrin - Longchamp',
  lat: 48.86877849178477,
  lon: 2.274354539176829,
  capacity: 42,
  stationCode: '16012',
  rental_methods: ['CREDITCARD'],
  distance: 0.000014693619841781265
}]

export function useVelibStations() {
  const [stations, setStations] = useState(STATIONS)

  return {
    stations
  }
}