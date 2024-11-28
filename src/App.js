import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const API_KEY = "12d2bab4ba5d0b19cb4bd65dc2f27f30";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Could not fetch weather data. Please check the city name.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <div className="info-row">
            <span>Temperature:</span>
            <span>{weather.main.temp}°C</span>
          </div>
          <div className="info-row">
            <span>Condition:</span>
            <span>{weather.weather[0].description}</span>
          </div>
          <div className="info-row">
            <span>Humidity:</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="info-row">
            <span>Wind Speed:</span>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="info-row">
            <span>Pressure:</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
          <div className="info-row">
            <span>Max Temp:</span>
            <span>{weather.main.temp_max}°C</span>
          </div>
          <div className="info-row">
            <span>Min Temp:</span>
            <span>{weather.main.temp_min}°C</span>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;