import { formatDate, mpsToKmh, metersToKm, roundDegree, weatherIcons } from './convertUnits.js';

export const fetchCurrWeatherData = async (data, key) => {
  const currWeatherIco = document.querySelector('#currIco');
  const currWeahterDescr = document.querySelector('#currDescr');
  const currWeahterTemp = document.querySelector('#currTemp');
  const currWeahterFeelsLike = document.querySelector('#currFeelsLike');
  const currWeatherCity = document.querySelector('#currCity');
  const currWeatherDate = document.querySelector('#currDate');

  const currWeatherSunrise = document.querySelector('#currSunrise');
  const currWeatherSunset = document.querySelector('#currSunset');
  const currWeatherHumidity = document.querySelector('#currHumidity');
  const currWeatherWind = document.querySelector('#currWind');
  const currWeatherVisibility = document.querySelector('#currVisibility');
  const currWeatherPressure = document.querySelector('#currPressure');

  let API_URL;
  if (data.lat && data.lon) {
    API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${key}&units=metric`;
  } else {
    API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${key}&units=metric`;
  }
  const response = await fetch(API_URL);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Sorry, we couldn't find <span>${data}</span>. Please double-check the spelling and try again.`);
    } else {
      throw new Error(
        "Oops! We're having trouble getting the latest weather information right now. Please try again later or contact support if the problem persists."
      );
    }
  }
  const fetchCurrWeatherData = await response.json();

  const {name, visibility, dt} = fetchCurrWeatherData,
    {speed} = fetchCurrWeatherData.wind,
    {temp, feels_like, humidity, pressure} = fetchCurrWeatherData.main,
    {icon, description} = fetchCurrWeatherData.weather[0],
    {sunrise, sunset} = fetchCurrWeatherData.sys;

  currWeatherIco.src = `icons/weather/weather-ico/${weatherIcons[icon]}.png`;
  currWeahterDescr.innerText = description;
  currWeahterTemp.innerText = await roundDegree(temp);
  currWeahterFeelsLike.innerText = `Feels like: ${await roundDegree(feels_like)}`;
  currWeatherCity.innerText = name;
  currWeatherDate.innerText = await formatDate(dt);
  
  currWeatherSunrise.innerText = await formatDate(sunrise, "hour");
  currWeatherSunset.innerText = await formatDate(sunset, "hour");
  currWeatherHumidity.innerText = `${humidity} %`;
  currWeatherWind.innerText = await mpsToKmh(speed);
  currWeatherVisibility.innerText = await metersToKm(visibility);
  currWeatherPressure.innerText = `${pressure} hPa`;
}