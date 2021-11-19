import React from 'react';
import logo from '../../assets/img/icon-128.png';
import { useVelibStations } from './useVelibStations'
import './Popup.css';

const Popup = () => {

  const { stations } = useVelibStations()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Found {stations.length} velib stations</p>
        <p>The closest station to you is: {stations[0].name}</p>

      </header>
    </div>
  );
};

export default Popup;
