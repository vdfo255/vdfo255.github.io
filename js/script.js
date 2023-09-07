
window.addEventListener('DOMContentLoaded', function() {
  
  //! ============= ASIDE CLOSE/OPEN =============
  const asideBar = document.querySelector('.aside'),
    asideCloseBtn = asideBar.querySelector('.aside__swipe'),
    asideCloseBtnImg = asideCloseBtn.querySelector('.aside__swipe-img'),
    asideLogoImg = asideBar.querySelector('.aside__logo-img');

  asideCloseBtn.addEventListener('click', () => {
    asideBar.classList.toggle('closed');
    
    //? ====== asideCloseBtnImg & asideLogoImg changing ======
    if (asideBar.classList.contains('closed')) {
      asideCloseBtnImg.src = "icons/aside/arrowRight.png";
      asideLogoImg.src = "icons/assets/logo/logoIcon-black.png";
    } else {
      asideCloseBtnImg.src = "icons/aside/arrowLeft.png";
      asideLogoImg.src = "icons/assets/logo/logoText-black.png";
    }
  })


  //! ============= WEATHER FETCHING & DISPLAYING =============
  //! FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT 
  const WEATHER_APIKEY = 'e732a92c66574d856b927e390c09674e',
    searchBar = document.querySelector('.weather__search-input'),
    searchBtn = document.querySelector('.weather__search-btn'),  
    locationBtn = document.querySelector('.weather__location-btn'),
    currWeatherBlock = document.querySelector('.weather__current'),  
    currWeatherIco = currWeatherBlock.querySelector('#currIco'),
    currWeahterDescr = currWeatherBlock.querySelector('#currDescr'),
    currWeahterTemp = currWeatherBlock.querySelector('#currTemp'),
    currWeahterFeelsLike = currWeatherBlock.querySelector('#currFeelsLike'),
    currWeatherCity = currWeatherBlock.querySelector('#currCity'),
    currWeatherDate = currWeatherBlock.querySelector('#currDate'),
    currWeatherSunrise = currWeatherBlock.querySelector('#currSunrise'),
    currWeatherSunset = currWeatherBlock.querySelector('#currSunset'),
    currWeatherHumidity = currWeatherBlock.querySelector('#currHumidity'),
    currWeatherWind = currWeatherBlock.querySelector('#currWind'),
    currWeatherVisibility = currWeatherBlock.querySelector('#currVisibility'),
    currWeatherPressure = currWeatherBlock.querySelector('#currPressure'),
    modalAlert = document.querySelector('.modal__alert'),
    modalAlertBtnClose = modalAlert.querySelector('button');

  const weatherIcons = {
    "01d": "d-clear-sky",         // Clear sky (day)
    "01n": "n-clear-sky",         // Clear sky (night) 
    "02d": "d-few-clouds",        // Few clouds (day)
    "02n": "n-few-clouds",        // Few clouds (night) 
    "03d": "d-scattered-clouds",  // Scattered clouds (day) - 
    "03n": "n-scattered-clouds",  // Scattered clouds (night) - 
    "04d": "a-clouds",            // Broken clouds (day) -
    "04n": "a-clouds",            // Broken clouds (night) - 
    "09d": "n-shower-rainl",      // Shower rain (day) - 1
    "09n": "n-shower-rain",       // Shower rain (night) - 
    "10d": "a-rain",              // Rain (day) - 2
    "10n": "a-rain",              // Rain (night) - 2
    "11d": "d-thunderstorm",      // Thunderstorm (day) - 1
    "11n": "n-thunderstorm",      // Thunderstorm (night) - 1
    "13d": "d-snow",              // Snow (day) - 1
    "13n": "n-snow",              // Snow (night) - 1
    "50d": "a-haze",              // Haze (day) - 2
    "50n": "a-haze"               // Haze (night) - 2
  };

  //* ========== getting user location to get CURRENT weather ==========
  const getUserLocation = async () => {
    const successCallback = async (position) => {
      const GPSData = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      //! console.log console.log console.log console.log console.log console.log console.log console.log
      console.log(`Your current position: ${JSON.stringify(GPSData)}`);

      await fetchCurrWeatherByCoords(GPSData);
    }
  
    const errorCallback = (error) => {
      console.log(error);
      fetchCurrWeather("Kyiv");
    }
  
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  locationBtn.addEventListener("click", getUserLocation);

  //* ========== formating city value before fetching CURRENT weather ==========
  function search() {
    let formatedCity = searchBar.value.trim();
    fetchCurrWeather(formatedCity);
  }

  //* ========== fetching CURRENT weather BY CITY ==========
  function fetchCurrWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_APIKEY}`) //? https://api.openweathermap.org/data/2.5/weather?q=poznan&units=metric&appid=e732a92c66574d856b927e390c09674e
    .then((response) => {
      if (!response.ok) {
        cityModalAlert();
      }
      return response.json();
    })
    .then((data) => displayCurrWeather(data));
  }
  fetchCurrWeather('Kyiv');


  //* ========== fetching CURRENT weather BY COORDINATES ==========
  function fetchCurrWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}}&units=metric&appid=${WEATHER_APIKEY}`) //? https://api.openweathermap.org/data/2.5/weather?q=poznan&units=metric&appid=e732a92c66574d856b927e390c09674e
    .then((response) => {
      if (!response.ok) {
        cityModalAlert();
      }
      return response.json();
    })
    .then((data) => displayCurrWeather(data));
  }

  //* ========== displaying CURRENT weather ==========
  function displayCurrWeather(data) {

    //! console.log console.log console.log console.log console.log console.log console.log console.log
    console.log(`CURRENT weather obj:`);
    console.log(JSON.parse(JSON.stringify(data)));

    const {name, visibility, id} = data,
      {speed} = data.wind,
      {temp, feels_like, humidity, pressure} = data.main,
      {icon, description} = data.weather[0],
      {sunrise, sunset} = data.sys;


    //! FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT 
    function msToHours(ms) {
      let hours = Math.floor( (ms / (1000 * 60 * 60) %  24) ),
        minutes = Math.floor( (ms / 1000 / 60) % 60),

      formattedHours = (hours < 10) ? "0" + hours : hours;
      formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

      return `${formattedHours}:${formattedMinutes}`;
    }

    //! FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT FOR EXPORT 
    function getCurrFormattedDate() {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const monthOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const date = currentDate.getDate();
      const day = currentDate.getDay();
    
      const currDate = `${date} ${monthOfYear[month]}, ${daysOfWeek[day]}`;
    
      return { currDate };
    }
    
    // currWeatherIco.src = `https://openweathermap.org/img/wn/${icon}.png`;
    currWeatherIco.src = `icons/weather/weather-ico/${weatherIcons[icon]}.png`;
    currWeahterDescr.innerText = description;
    currWeahterTemp.innerText = `${temp} °C`;
    currWeahterFeelsLike.innerText = `Feels like: ${feels_like} °C`;
    currWeatherCity.innerText = name;
    // currWeatherDate.innerText = new Date().toString().split(' ').splice(1,3).join(' ');
    currWeatherDate.innerText = getCurrFormattedDate().currDate;
    currWeatherSunrise.innerText = msToHours(sunrise);
    currWeatherSunset.innerText = msToHours(sunset);
    currWeatherHumidity.innerText = `${humidity} %`;
    currWeatherWind.innerText = `${speed} km/h`,
    currWeatherVisibility.innerText = `${Math.floor(visibility / 1000)} km`,
    currWeatherPressure.innerText = pressure;
    
    fetchTodayWeather(id);
  }



 
  //* ========== fetching TODAY`S weather ==========
  function fetchTodayWeather(id) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${WEATHER_APIKEY}`) //? https://api.openweathermap.org/data/2.5/forecast?id=3088171&appid=e732a92c66574d856b927e390c09674e
    .then((response) => {
      if (!response.ok) {
        alert('Today`s wheather is not found');
      }
      return response.json();
    })
    .then((data) => displayTodayWeather(data));
  }
  
  //* ========== displaying TODAY`S weather ==========
  function displayTodayWeather(data) {
    
    //! console.log console.log console.log console.log console.log console.log console.log console.log
    console.log(`TODAY weather obj:`);
    console.log(JSON.parse(JSON.stringify(data)));
  }




  //* ========== seaching wheather btns keyups ==========
  searchBar.addEventListener('keyup', function(event) {
      if (event.key == 'Enter') {
          search();
      }
  })
  searchBtn.addEventListener('click', search); 


  //! ============= cityModalAlert =============
  function closeCityModalAlert() {
    modalAlert.classList.remove('show');
    document.body.style.overflow = '';
  }

  function cityModalAlert() {
    modalAlert.classList.add('show');
    document.body.style.overflow = 'hidden';
    modalAlertBtnClose.addEventListener('click', closeCityModalAlert);
  }

  document.addEventListener('keydown', (e) =>{ 
    if (e.code === 'Escape') {
      closeCityModalAlert();
    }
  })

  //! ============= DARK MODE THEME SWITCHER =============
  const themeSwitcher = document.querySelector('#themeSwitcher'),
    icoThemeSwitcher = themeSwitcher.querySelector('img'),
    spanThemeSwitcher = themeSwitcher.querySelector('span'),
    textThemeSwitcher = themeSwitcher.querySelector('.aside__item-text');

  themeSwitcher.addEventListener('click', (event) => {
    document.body.classList.toggle('darkMode');

    if (document.body.classList.contains('darkMode')) {
      icoThemeSwitcher.src="icons/aside/moon.svg";
      spanThemeSwitcher.innerHTML = 'Dark Mode';
      textThemeSwitcher.innerHTML = 'Dark Mode';
    } else {
      icoThemeSwitcher.src="icons/aside/sun.svg";
      spanThemeSwitcher.innerHTML = 'Light Mode';
      textThemeSwitcher.innerHTML = 'Light Mode';
    }
  })
})