# Weather App

A responsive weather application built using React, Vite, and OpenWeatherMap API.  
The app allows users to search for real-time weather information for any city with proper loading states and error handling.

---

## Features

- Search weather by city name
- Real-time weather data using OpenWeatherMap API
- Temperature display in Celsius
- Humidity and wind speed information
- Dynamic weather icons based on weather conditions
- Loading indicator while fetching data
- Error handling for invalid city names and failed API requests
- Responsive design for mobile and desktop devices

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- OpenWeatherMap API

---

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

Go to the project directory:

```bash
cd Weather-App
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```env
VITE_APP_ID=your_api_key
```

---

## API Used

OpenWeatherMap API:

https://openweathermap.org/api

---

## Project Structure

```txt
src
│
├── assets
│   ├── clear.png
│   ├── cloud.png
│   ├── drizzle.png
│   ├── humidity.png
│   ├── mist.png
│   ├── rain.png
│   ├── search.png
│   ├── snow.png
│   └── wind.png
│
├── components
│   ├── Weather.jsx
│   └── Weather.css
│
├── App.jsx
└── main.jsx
```

---

## Error Handling

The application handles:

- Invalid city names
- Empty input searches
- API request failures

---

## Loading State

A loading indicator is displayed while weather data is being fetched from the API.

---

## Future Improvements

- 5-day weather forecast
- Dark mode support
- Search history
- Geolocation-based weather
- Better animations and transitions

---

## Live Demo

(Add your Vercel deployment link here)

---