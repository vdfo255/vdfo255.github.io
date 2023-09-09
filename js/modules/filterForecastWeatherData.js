import { formatDate } from "./convertUnits.js";

export const filterForecastWeatherData = async (forecastWeatherData) => {
  const prevFilterContainer = document.querySelector("weather__forecast-filter-container");
  const specialDates = new Set(["All Days"]);
  const body = document.querySelector("body");

  if (prevFilterContainer) {
    prevFilterContainer.remove();
  }

  for (let i = 0; i < forecastWeatherData.list.length; i++) {
    specialDates.add(await formatDate(forecastWeatherData.list[i].dt, "short"));
  }

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("weather__forecast-filter-container");
  body.insertBefore(filterContainer, body.children[4]);

  filterContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    filterContainer.scrollLeft += event.deltaY * 2;
  })

  specialDates.forEach(async (specialDate) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("weather__forecast-filter-item");

    if (specialDate === "All Days") {
      filterItem.classList.add("active");
    }

    filterItem.innerHTML = specialDate;
    filterContainer.appendChild(filterItem);
  })

  const filterItems = document.querySelectorAll(".weather__forecast-filter-item");
  const forecastWeatherDates = document.querySelectorAll(".weather__forecast-card-date");
  forecastWeatherDates.forEach(async (forecastWeatherDate) => {
    forecastWeatherDate.parentElement.parentElement.style.display = "flex";
  })

  filterItems.forEach(async (filterItem) => {
    filterItem.addEventListener("click", async () => {
      const forecastWeatherDates = document.querySelectorAll(".daily-weather-forecast-date");
      const filterItems = document.querySelectorAll(".filter-item");

      filterItems.forEach(async (filterItem) => {
        filterItem.classList.remove("active");
      });

      forecastWeatherDates.forEach(async (forecastWeatherDate) => {
        forecastWeatherDate.parentElement.parentElement.style.display = "flex";

        if (filterItem.innerHTML === "All Days") {
          forecastWeatherDate.parentElement.parentElement.style.display = "flex";

          filterItem.classList.add("active");
        } else if (forecastWeatherDate.innerHTML !== filterItem.innerHTML) {
          forecastWeatherDate.parentElement.parentElement.style.display = "none";

          filterItem.classList.add("active");
        }
      });
    });
  })
}