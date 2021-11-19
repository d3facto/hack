import React from 'react';
import logo from '../../assets/img/icon-128.png';
import { useVelibStations } from './useVelibStations'
import { useLocation } from './useGeolocation'
import './Popup.css';

const MAX_VELIB = 3

const Popup = () => {

  const { lon, lat } = useLocation()
  const { closestStations, stationsInfo } = useVelibStations(lat, lon, MAX_VELIB)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Latitude {lat}, longitude {lon}</p>

        {closestStations.length !== 0
          ? (
            <>
              <p>The {closestStations.length} closest velib stations are:</p>
              <ol>
                {closestStations.map(station => <Station key={station.station_id} station={station} />)}
              </ol>
            </>
          ) : (<p>Loading...</p>)
        }
      </header>
    </div>
  );
};

const Station = ({ station }) => {
  return (
    <li>{station.name} - {station.capacity} velib available</li>
  )
}

export default Popup;
