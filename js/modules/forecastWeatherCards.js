export const createHourlyCards = () => {
  const hourlyForecastWeatherSection = document.querySelector(".card card-3");

  for (let i = 0; i < 5; i++) {
    const hourlyForecastWeatherCard = document.createElement("div");
    hourlyForecastWeatherCard.classList.add("card-3__sm");

    const hourlyForecastWeatherDateTime = document.createElement("div");
    hourlyForecastWeatherDateTime.classList.add("card-3__sm-datetime-container");

    const hourlyForecastWeatherDate = document.createElement("div");
    hourlyForecastWeatherDate.classList.add("card-3__sm-date","dynamic-data", "loading");
    hourlyForecastWeatherDate.innerHTML = "&nbsp;";

    const hourlyForecastWeatherTime = document.createElement("div");
    hourlyForecastWeatherTime.classList.add("card-3__sm-time", "dynamic-data", "loading");
    hourlyForecastWeatherTime.innerHTML = "&nbsp;";

    const hourlyForecastWeatherTemp = document.createElement("div");
    hourlyForecastWeatherTemp.classList.add("card-3__sm-temp", "dynamic-data", "loading");
    hourlyForecastWeatherTemp.innerHTML = "&emsp;&emsp;";

    hourlyForecastWeatherDateTime.appendChild(hourlyForecastWeatherDate);
    hourlyForecastWeatherDateTime.appendChild(hourlyForecastWeatherTime);

    hourlyForecastWeatherCard.appendChild(hourlyForecastWeatherDateTime);
    hourlyForecastWeatherCard.appendChild(hourlyForecastWeatherTemp);

    hourlyForecastWeatherSection.appendChild(hourlyForecastWeatherCard);
  }
}

