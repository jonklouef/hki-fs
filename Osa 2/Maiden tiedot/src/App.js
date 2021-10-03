import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Results = (props) => {
  const { countries, newFilter, setNewFilter, newWeather, setNewWeather } = props
  const filtered = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  if (newFilter === '') {
   return (
    <tr>
      <td>
        {''}
      </td>
    </tr>  
  )
  } else if (filtered.length === 0) {
    return (
      <tr>
        <td>
          No matches, try another filter.
        </td>
      </tr>  
   )
  } else if (filtered.length === 1) {
      const country = filtered[0]
      return (
        <Country country={country} newWeather={newWeather} setNewWeather={setNewWeather} />
      )
  } else if (filtered.length > 1 && filtered.length <= 10) {
      return (
        filtered.map(country => 
          <tr key={country.name}>
            <td width="100">
              {country.name}
            </td>
            <td>
              <button onClick={() => setNewFilter(country.name)}> show </button>
            </td>
          </tr>
        )    
      )
  } else {
      return (
        <tr>
          <td>
            Too many matches, please give more letters.
          </td>
        </tr> 
      )
  }
}

const Country = (props) => {
  const { country, newWeather, setNewWeather } = props
  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    access_key: api_key,
    query: country.capital
  } 
  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setNewWeather(response.data.current)
      })   
    }, [])

  return (
    <React.Fragment>
    <tr>
      <td>
        <h1>{country.name}</h1>
      </td>
    </tr>
    <tr>  
      <td width="100">
        Capital: 
      </td>
      <td>
        {country.capital}
      </td>
    </tr>
    <tr>
      <td width="100">
        Population: 
      </td>
      <td>
        {country.population}
      </td>
    </tr>
    <tr>
      <td>
        <h3>Languages:</h3>
      </td>
    </tr>
      {
        country.languages.map(language =>
          <tr key={language.name}>
            <td>
              {language.name}    
            </td>
          </tr>
        )
      }
    <tr><td><br></br></td></tr>
    <tr>
      <td>
        <img style={{width: '200px', height: '150px'}} src={country.flag} alt={'flag'} />
      </td>  
    </tr>   
    <tr>
      <td>
        <h3>Weather in {country.capital}</h3>
      </td>
    </tr>
    <tr>
      <td>
      <b>temperature:</b> {newWeather.temperature} Celcius
      </td>
    </tr>
    <tr>
      <td>  
        <img src={newWeather.weather_icons} alt='' width='50px' height='50px'></img>
      </td>
    </tr>
    <tr>
      <td>
        <b>wind speed:</b> {newWeather.wind_speed} km/h
      </td>
    </tr>
    <tr>
      <td>
        <b>wind direction:</b> {newWeather.wind_dir}
      </td>
    </tr>
  </React.Fragment> 
  ) 

}

function App() {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newWeather, setNewWeather] = useState({})
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all') 
      .then(response => setCountries(Array.from(response.data))
    )}, [])
  
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filter = (event) => {
    event.preventDefault()
    setNewFilter('')   
  }

  return (
    <div> 
      <h2>Find countries</h2>
    
      <form onSubmit={filter}>
        <div >
          Search country: <input 
          value={newFilter} 
          onChange={handleFilter} />
        </div>
      </form>
      <br></br>
      <table>
        <tbody>
          <Results countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} 
          newWeather={newWeather} setNewWeather={setNewWeather} />  
        </tbody>
      </table>
    </div>
  )

}

export default App;
