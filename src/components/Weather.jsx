import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import mist_icon from '../assets/mist.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const allIcons = {
  "01d": clear_icon, "01n": clear_icon,
  "02d": cloud_icon, "02n": cloud_icon,
  "03d": cloud_icon, "03n": cloud_icon,
  "04d": drizzle_icon, "04n": drizzle_icon,
  "09d": rain_icon, "09n": rain_icon,
  "10d": rain_icon, "10n": rain_icon,
  "13d": snow_icon, "13n": snow_icon,
  "50d": mist_icon, "50n": mist_icon,
}

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.")
      return
    }

    setLoading(true)
    setError(null)
    setWeatherData(null)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "City not found.")
        setLoading(false)
        return
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const forecastRes = await fetch(forecastUrl)
      const forecastData = await forecastRes.json()
      const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5)

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: (data.wind.speed * 3.6).toFixed(1),
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon,
        forecast: daily,
      })

      inputRef.current.value = ""
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    search("New York")
  }, [search])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search' />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
        </div>
      )}

      {error && !loading && (
        <p className="error-msg">{error}</p>
      )}

      {weatherData && !loading && (
        <div>
          <img src={weatherData.icon} alt="Weather condition" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className='col'>
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="Wind speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
          <div className="forecast">
            {weatherData.forecast.map((day, i) => {
              const dayName = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })
              const dayIcon = allIcons[day.weather[0].icon] || clear_icon
              const dayTemp = Math.floor(day.main.temp)
              return (
                <div className="forecast-day" key={i}>
                  <img src={dayIcon} alt={day.weather[0].description} />
                  <p className="forecast-temp">{dayTemp}°C</p>
                  <p className="forecast-label">{dayName}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather