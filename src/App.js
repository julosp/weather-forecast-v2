import React, { useEffect, useState } from "react";
import "./sass/style.scss";
import logo from "./assets/img/logo_light.png";

function App() {
  const API_KEY = "56811cc41f3f4adf84482924233103";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [todayForecast, setTodayForecast] = useState();
  const [tempHours, setTempsHours] = useState([]);
  const [loading, isLoading] = useState(false);

  const getWeatherData = async (e) => {
    e.preventDefault();
    isLoading(true);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8
    `;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data.current);
      setLocation(data.location);
      setForecast(data.forecast.forecastday.slice(1));
      setTodayForecast(data.forecast.forecastday[0]);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  };
  useEffect(() => {
    if (todayForecast) {
      const currentHours = new Date().getHours();
      setTempsHours(
        todayForecast.hour
          .map((hour, index) => ({ key: index, value: hour }))
          .filter((hour) => hour.key >= currentHours)
          .map((hour) => hour.value)
      );
    }
  }, [todayForecast]);

  return (
    <div className="App">
      <div className="global_wrap">
        <header className="header">
          <img src={logo} alt="logo" className="header_logo" />
          <h1 className="header_title">Petit Nuage</h1>
        </header>
        <div className="">
          <form onSubmit={getWeatherData}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Get Weather</button>
          </form>
        </div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div>
            <div>
              {location.name}, {location.region}{" "}
            </div>

            {weatherData && (
              <>
                <div>
                  <p> {weatherData.temp_c}°C,</p>
                  <p>{weatherData.condition.text}</p>
                  <img src={weatherData.condition.icon} alt="icon" />
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
                        <p>{forecast.date.split("-").pop()}</p>
                        <img src={forecast.day.condition.icon} alt="icon" />
                        <p>{forecast.day.mintemp_c}°C</p>
                        <p>{forecast.day.maxtemp_c}°C</p>
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
