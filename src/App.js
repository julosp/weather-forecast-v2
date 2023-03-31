import React, { useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "56811cc41f3f4adf84482924233103";
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const getWeatherData = async (e) => {
    e.preventDefault();
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no
    `;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
    console.log(weatherData);
  };

  return (
    <div className="App">
      <form onSubmit={getWeatherData}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
