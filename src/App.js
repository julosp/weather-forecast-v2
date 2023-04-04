import React, { useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "56811cc41f3f4adf84482924233103";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [todayForecast, setTodayForecast] = useState();
  const [tempHours, setTempsHours] = useState([]);

  const getWeatherData = async (e) => {
    e.preventDefault();
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8
    `;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data.current);
    setLocation(data.location);
    setForecast(data.forecast.forecastday.slice(1));
    setTodayForecast(data.forecast.forecastday[0]);
    const currentHours = new Date().getHours();
    setTempsHours(
      todayForecast.hour
        .map((hour, index) => ({ key: index, value: hour }))
        .filter((hour) => hour.key >= currentHours)
        .map((hour) => hour.value)
    );
  };
  console.log(forecast)

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
          <div>
            {location.name}, {location.region}{" "}
          </div>
          <div>
            <div>
              <p> {weatherData.temp_c}°C,</p>
              <p>{weatherData.condition.text}</p>
              <img src={weatherData.condition.icon} alt="icon" />
            </div>
          </div>
          <div>
            {tempHours.map((temp) => (
              <div key={temp.time}>
                <p>{temp.time.split(" ").pop()}h</p>
                <p>{temp.temp_c}°C</p>
              </div>
            ))}
          </div>
           <div>
            <div key={forecast.date}>
              {forecast.map((forecast) => (
                <>
                  <p>{forecast.date}</p>
                  <img src={forecast.day.condition.icon} alt="icon"/>
                  <p>{forecast.day.mintemp_c}°C</p>
                  <p>{forecast.day.maxtemp_c}°C</p>
                </>
              ))}
            </div>
          </div>  
        </div>
      )}
    </div>
  );
}

export default App;
