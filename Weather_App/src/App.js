import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [location,setLocation] = useState('');
  const [weatherData,setNewWeather] = useState({});
  var weather={};

  var lat1,lon1;
  const geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=84f3ebf0cde79dc4e85c6c8ef336d878`

  const setCoordinates= (a,b) =>{
    lat1 = a;
    lon1 = b;
  }

  const setWeather = (w) => {
    weather = w;
  }

  const getWeather = (lat2,lon2) => {
    console.log("Getting weather details...");
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=84f3ebf0cde79dc4e85c6c8ef336d878`;
    console.log(api_url);
    axios.get(api_url).then((response1) => {
      // console.log(response1.data);
      setWeather(response1.data);
      console.log("Weather Data Success");
      console.log(weather);
      setNewWeather(weather);
    })
  }

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      console.log(location);
      console.log(geo_url);
      axios.get(geo_url).then((response) => {
        console.log("Location Got...")
        console.log(response.data[0]);
        setCoordinates(response.data[0].lat,response.data[0].lon)

        console.log("lat1 and lon1");
        console.log(lat1);
        console.log(lon1);

        getWeather(lat1,lon1);
      })

      event.target.value = '';
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          type='text'
          onChange={(event) => setLocation(event.target.value) }
          onKeyPress={(event) => searchLocation(event)}
          placeholder="Enter Location"
          ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{weatherData.name}</h2>
          </div>
          <div className="temp">
            { weatherData.main ? <h1>{weatherData.main.temp.toFixed()-273} °C</h1> : null }
          </div>
          <div className="description">
          { weatherData.weather ? <p>{weatherData.weather[0].description}</p>: null }
          </div>
        </div>
        
        {weatherData.name !== undefined &&
          <div className="bottom">
          <div className="feels">
          { weatherData.main ? <p>{weatherData.main.feels_like.toFixed() - 273} °C</p> : null }
            <p className="bold">Feels Like</p>
          </div>
          <div className="humidity">
          { weatherData.main ? <p>{weatherData.main.humidity} %</p> : null }
            <p className="bold">Humidity</p>
          </div>
          <div className="wind">
          { weatherData.wind ? <p>{weatherData.wind.speed} MPS</p> : null }
            <p className="bold">Wind Speed</p>
          </div>
        </div>
        }
        {/* <div className="bottom">
          <div className="feels">
          { weatherData.main ? <p>{weatherData.main.feels_like} °F</p> : null }
            <p className="bold">Feels Like</p>
          </div>
          <div className="humidity">
          { weatherData.main ? <p>{weatherData.main.humidity} %</p> : null }
            <p className="bold">Humidity</p>
          </div>
          <div className="wind">
          { weatherData.wind ? <p>{weatherData.wind.speed} MPS</p> : null }
            <p className="bold">Wind Speed</p>
          </div>
        </div> */}

      </div>
    </div>
  );
}

// https://www.youtube.com/watch?v=UjeXpct3p7M
export default App;
