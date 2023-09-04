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
  const WEATHER_APIKEY = 'e732a92c66574d856b927e390c09674e',
    searchBar = document.querySelector('.weather__search-input'),
    searchBtn = document.querySelector('.weather__search-btn'),  
    currWeatherBlock = document.querySelector('.weather__current'),  
    currWeatherIco = currWeatherBlock.querySelector('#currIco'),
    currWeahterTemp = currWeatherBlock.querySelector('#currTemp'),
    currWeahterDescr = currWeatherBlock.querySelector('#currDescr'),
    currWeatherCity = currWeatherBlock.querySelector('#currCity'),
    currWeatherDate = currWeatherBlock.querySelector('#currDate'),
    currWeatherSunrise = currWeatherBlock.querySelector('#currSunrise'),
    currWeatherSunset = currWeatherBlock.querySelector('#currSunset'),
    currWeatherHumidity = currWeatherBlock.querySelector('#currHumidity'),
    currWeatherWind = currWeatherBlock.querySelector('#currWind'),
    currWeatherVisibility = currWeatherBlock.querySelector('#currVisibility'),
    currWeatherPressure = currWeatherBlock.querySelector('#currPressure');

  //* ========== formating city value before fetching CURRENT weather ==========
  function search() {
    let formatedCity = searchBar.value.trim();
    fetchCurrWeather(formatedCity);
  }

  //* ========== fetching CURRENT weather ==========
  function fetchCurrWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_APIKEY}`) //? https://api.openweathermap.org/data/2.5/weather?q=poznan&units=metric&appid=e732a92c66574d856b927e390c09674e
    .then((response) => {
      if (!response.ok) {
        alert('Current wheather is not found');
      }
      return response.json();
    })
    .then((data) => displayCurrWeather(data));
  }
  fetchCurrWeather('Poznan');

  //* ========== displaying CURRENT weather ==========
  function displayCurrWeather(data) {

    //! console.log console.log console.log console.log console.log console.log console.log console.log
    console.log(`CURRENT weather obj:`);
    console.log(JSON.parse(JSON.stringify(data)));

    const {name, visibility, id} = data,
      {speed} = data.wind,
      {temp, humidity, pressure} = data.main,
      {icon, description} = data.weather[0],
      {sunrise, sunset} = data.sys;

    //* ========== converting sunset & sunrise ms to time ==========
    function msToHours(ms) {
      let hours = Math.floor( (ms / (1000 * 60 * 60) %  24) ),
        minutes = Math.floor( (ms / 1000 / 60) % 60),

      formattedHours = (hours < 10) ? "0" + hours : hours;
      formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

      return `${formattedHours}:${formattedMinutes}`;
    }

    currWeatherIco.src = `https://openweathermap.org/img/wn/${icon}.png`;
    currWeahterTemp.innerText = `${temp} °C`;
    currWeahterDescr.innerText = description.charAt(0).toUpperCase() + description.slice(1);
    currWeatherCity.innerText = name;
    currWeatherDate.innerText = new Date().toString().split(' ').splice(1,3).join(' ');
    currWeatherSunrise.innerText = msToHours(sunrise);
    currWeatherSunset.innerText = msToHours(sunset);
    currWeatherHumidity.innerText = `${humidity} %`;
    currWeatherWind.innerText = `${speed} km/h`,
    currWeatherVisibility.innerText = `${Math.floor(visibility / 1000)} km`,
    currWeatherPressure.innerText = pressure;
    
    fetchTodayWeather(id);
  }

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
  searchBtn.addEventListener('keyup', function(event) {
      if (event.key == 'Enter') {
          search();
      }
  })
  searchBtn.addEventListener('click', function() {search()});
  

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