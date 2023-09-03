window.addEventListener('DOMContentLoaded', function() {
  console.log('loaded');
    
  //! ========== ASIDE CLOSE/OPEN ==========
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

  //! ========== WEATHER FETCHING & DISPLAYING ==========
  const WEATHER_APIKEY = 'e732a92c66574d856b927e390c09674e',
    searchBar = document.querySelector('.weather__search-input'),
    searchBtn = document.querySelector('.weather__search-btn'),    
    weatherCard = document.querySelector('.weather__display'),
    currWeatherIco = document.querySelector('#currIco'),
    currWeahterTemp = document.querySelector('#currTemp'),
    currWeahterDescr = document.querySelector('#currDescr'),
    currWeatherCity = document.querySelector('#currCity'),
    currWeatherHumidity = document.querySelector('#currHumidity'),
    currWeatherWind = document.querySelector('#currWind');

  //* ========== fetching weather ==========
  function searchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_APIKEY}`)
    .then((response) => {
      if (!response.ok) {
        alert('Wheather is not found');
      }
      return response.json();
    })
    .then((data) => showWeather(data));
  }

  //* ========== displaying weather ==========
  function showWeather(data) {
    const {name} = data,
      {speed} = data.wind,
      {temp, humidity} = data.main,
      {icon, description} = data.weather[0];
    
  currWeatherIco.src = `https://openweathermap.org/img/wn/${icon}.png`;
  currWeahterTemp.innerText = `${temp} °C`;
  currWeahterDescr.innerText = description;
  currWeatherCity.innerText = name;
  currWeatherHumidity.innerText = `${humidity} %`;
  currWeatherWind.innerText = `${speed} km/h`;
  }

  //* ===== checking for correct city before fetching weather =====
  function search() {
    correctValue = searchBar.value.split(' ').join('');
    searchWeather(correctValue);
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
  
  //! ========== DARK MODE THEME SWITCHER ==========
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