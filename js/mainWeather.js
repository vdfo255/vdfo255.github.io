// import { createHourlyCards } from "./modules/createForecastWeatherCards.js";
import { startLoadingState, endLoadingState } from "./modules/setLoadingState.js";
import { handleError } from './modules/handleError.js';
import { fetchCurrWeatherData } from './modules/fetchCurrWeatherData.js';
import { fetchForecastWeatherData } from "./modules/fetchForecastWeatherData.js";


//! ============= ASIDE CLOSE/OPEN =============
const asideBar = document.querySelector('.aside');
const asideCloseBtn = asideBar.querySelector('.aside__swipe');
const asideCloseBtnImg = asideCloseBtn.querySelector('.aside__swipe-img');
const asideLogoImg = asideBar

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
//! ============= ASIDE CLOSE/OPEN =============




const API_KEY = 'e732a92c66574d856b927e390c09674e';
const searchBar = document.querySelector('.weather__search-input');
const searchBtn = document.querySelector('.weather__search-btn');
const locationBtn = document.querySelector('.weather__location-btn');

// createHourlyCards();
// createDailyCards();

const fetchFullWeatherData = async (data) => {
  try {
    await startLoadingState();
    await fetchCurrWeatherData(data, API_KEY);
    await fetchForecastWeatherData(data, API_KEY);
    await endLoadingState();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      await handleError(
        "Uh oh! It looks like you're not connected to the internet. Please check your connection and try again.",
        "Refresh Page"
      );
    } else {
      await handleError(error.message, "Try Again");
    }
  }
}



//* ========== getting user location to get CURRENT weather ==========
const getUserLocation = async () => {
  const successCallback = async (position) => {
    const GPSData = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    await fetchFullWeatherData(GPSData, API_KEY);
  }

  const errorCallback = (error) => {
    console.log(error);
    fetchFullWeatherData("Kyiv", API_KEY);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
locationBtn.addEventListener("click", getUserLocation);
getUserLocation();
// fetchFullWeatherData("Kyiv", API_KEY);




//* ========== formating city value before fetching CURRENT weather ==========
function search() {
  const formatedCity = searchBar.value.trim();
  fetchFullWeatherData(formatedCity, API_KEY);
}

//* ========== seaching wheather btns keyups ==========
searchBtn.addEventListener('click', search);
searchBar.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    search();
  }
})




