import React, { useState } from "react";
import axios from 'axios'
import "./index.css"
function App() {

  // CREATED BY ANAND PRABHAT 
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5bf47c72f44f129e7b03d3c698b8e83a`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response from server:', error.response.status);
            console.error('Data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
          }
        })
        .finally(() => {
          setLocation('');
          const outerbox = document.querySelector('.outerbox');
        if (outerbox) {
          outerbox.style.display = 'block'; // Change to 'visible' or any other appropriate value
        }
        });
    }
  };
  
  
  return (
    <div className="app">
      <div className="search">
        <input id="search_bar"
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text" />
      </div>
      <div className="container">
        <div className="top">
    <div className="outerbox">
        
          <div className="location">
            <p id="location">{data.name}</p>
          </div>
          <div className="temp">
          {data.main ? <h1>{((data.main.temp - 32) * 5/9).toFixed(2)}&deg;C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>

        

        {data.name != null &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold desc">{data.main.feels_like}&deg;F</p> : null}

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold desc">{data.main.humidity}%</p> : null}

              <p className="desc">Humidity</p>
            </div>
            <div className="wind ">
              {data.wind ? <p className="bold desc">{data.wind.speed}MPH</p> : null}

              <p>Wind Speed</p>
            </div>
          </div>}
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;
