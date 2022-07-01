import logo from './logo.svg';
import './App.css';
import Widget from './Widget'
import { useEffect, useState } from "react";

function App() {
  const [siren, setSiren] = useState(null)
  useEffect(() => {
    const url = new URL(
     window.location
    );
    const value = url.searchParams.get('siren'); // => 'hello'
    setSiren(value)
    

  }, [])

  console.log('siren IS " :', siren)
  if (!siren) {
    return (<div>Defacto...</div>)
  } else {

    return (
      <div className="App">
        <Widget siren={siren} />
      </div>
    );
  }
}

export default App;
