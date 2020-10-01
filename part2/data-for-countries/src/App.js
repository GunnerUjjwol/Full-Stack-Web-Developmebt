import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Country = ({country}) => {

  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
    .then(response => {
      const weather = {
        'temperature' : response.data.current.temperature + ' Celsius',
        'wind' : response.data.current.wind_speed + ' mph direction ' + response.data.current.wind_dir,
        'weather_icons' :  response.data.current.weather_icons

      }
      setWeather(weather);
    })
  },[])
  return (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>capital {country.population}</div>
    <h3>Spoken languages</h3>
    <div>{
      country.languages.map(language => 
      <li key={language.name}>{language.name}</li>
      )
    }</div>
    <img src={country.flag} alt={country.flag} width='200px' height = '120px' />
    <h3>Weather in {country.capital}</h3>
    <div>
      <p><strong>temperature:</strong>{weather?.temperature}</p>
      <p>{weather?.weather_icons.map(icon => <img key={icon} src={icon}/>)}</p>
      <p><strong>wind:</strong>{weather?.wind}</p>
    </div>
  </div>

  )
}


const App = () => {
  const [filterValue, setFilterValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => {
      setCountries(response.data)
    })
  },[])
  const handleInputChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleClick = (country) => setFilterValue(country.name)

  let countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()));
  return (
    <div>
      <div>find countries <input value={filterValue} onChange={handleInputChange}/></div>
      <div id="countryView"> 
          {(countriesToShow.length > 10) && <p>Too many matches, specify another filter</p>}
          {(countriesToShow.length === 1) && <Country country={countriesToShow[0]}/>}
          {(countriesToShow.length > 1 && countriesToShow.length <=10) && 
            countriesToShow.map(country => <p key={country.name}>{country.name}<button onClick={() =>handleClick(country)} >show</button></p>)
          }
      </div>
    </div>
  )
}

export default App