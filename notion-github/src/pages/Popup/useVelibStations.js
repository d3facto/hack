import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

export function useVelibStations(lat, lon, limit) {
  const [stationsInfo, setStationsInfo] = useState([])
  const [recommendedStations, setRecommendedStations] = useState([])

  const closestStations = useClosestStations(lat, lon, limit)

  useEffect(() => {
    const f = async () => {
      const station_ids = closestStations.map(s => s.station_id)
      const stations_info = await getStationsInfo(station_ids)
      setStationsInfo(stations_info)

      const recommendedStations2 = getRecommendedStations(stations_info)
      setRecommendedStations(recommendedStations2)
    }
    f()
  }, [closestStations])

  console.log({ closestStations, recommendedStations })

  return {
    closestStations,
    stationsInfo,
    recommendedStations
  }
}

function getRecommendedStations(stations) {
  // const max_distance = 0.00001
  // var filtered_station = stations.filter(s => ((s.is_renting = 1) && (s.is_returning = 1) && (s.is_renting = 1) && s.distance <= max_distance))

  var scored_station = stations.map(function (s) {
    var score = 0
    capacity = s.num_bikes_available + s.num_docks_available

    if (capacity <= 15) {
      score = s.num_bikes_available
    } else {
      score = s.num_bikes_available / 2
    }
    s.score = score
  })
  scored_station.sort((a, b) => b.score - a.score)
  return scored_station
}


export function useStations() {
  const [stations, setStations] = useState([])

  useEffect(() => {
    const station_information = "https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json"
    axios.get(station_information).then(response =>
      setStations(response.data.data.stations)
    )
  }, [])
  return stations
}

export function useClosestStations(lat, lon, limit) {
  const stations = useStations()

  const result = useMemo(() => {
    const copy = [...stations]
    copy.sort((a, b) => {
      const distance_a = (lat - a.lat) ** 2 + (lon - a.lon) ** 2
      const distance_b = (lat - b.lat) ** 2 + (lon - b.lon) ** 2
      return distance_a - distance_b
    });

    return copy.slice(0, limit);
  }, [stations, lat, lon, limit])

  return result
}

async function getStationsInfo(station_ids) {
  const velib_url = "https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json"

  const response = await axios.get(velib_url)
  const val = response.data;
  const result = [];
  var stations = val.data.stations
  for (const station of stations) {
    if (station_ids.includes(station.station_id)) {
      result[station.station_id] = station
    }
  }
  return result
}
