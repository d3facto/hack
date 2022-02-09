import {test, destpicker} from './api';

function App() {
  const result = test();
  const result2 = destpicker([], []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
