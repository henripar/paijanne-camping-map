import { useState } from 'react';
import Map from './components/Map';
import { ToggleSwitch } from './components/ToggleSwitch';
import './App.css';

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const changeTheme = () => {
    console.log('Changin to dark mode');
    let root = document.documentElement;
    root.classList.toggle('dark');
    setDarkmode(!darkmode);
  };
  return (
    <div>
      <ToggleSwitch
        setDarkmode={changeTheme}
        isDarkmode={darkmode}
      ></ToggleSwitch>

      <Map></Map>
    </div>
  );
}

export default App;
