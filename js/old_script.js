    
//! CONSTS
const WEATHER_APIKEY = 'e732a92c66574d856b927e390c09674e',
        searchBar = document.querySelector('.card__search-input'),
        searchBtn = document.querySelector('.card__search-btn'),
        weatherCard = document.querySelector('.card__weather'),
        cityWeather = document.querySelector('.card__weather-city'),
        descrWeather = document.querySelector('.card__weather-descr'),
        tempWeather = document.querySelector('.card__weather-temp'),
        humidityWeather = document.querySelector('.card__weather-humidity'),
        windWeather = document.querySelector('.card__weather-wind'),
        iconWeather = document.querySelector('.card__weather-icon');


//! SEARCHING WEATHER
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


//! DISPLAYING WEATHER
function showWeather(data) {
    const {name} = data,
            {speed} = data.wind,
            {temp, humidity} = data.main,
            {icon, description} = data.weather[0];
    
document.body.style.background = "url('https://source.unsplash.com/1920x1080/?" + name + "') center center/cover no-repeat";

cityWeather.innerText = `Weather in ${name}`;
descrWeather.innerText = description;
tempWeather.innerText = `${temp} °C`;
humidityWeather.innerText = `Humidity: ${humidity} %`;
windWeather.innerText = `Wind speed: ${speed} km/h`;
iconWeather.src = `https://openweathermap.org/img/wn/${icon}.png`;

weatherCard.classList.remove("loading");
}

function search() {
    correctValue = searchBar.value.split(' ').join('');
    searchWeather(correctValue);
}


//! BTN KEYUPS
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
