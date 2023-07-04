import { useState } from 'react';
import Map from './components/Map';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Map></Map>
    </div>
  );
}

export default App;
