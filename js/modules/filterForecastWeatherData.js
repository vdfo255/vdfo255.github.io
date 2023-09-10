import { formatDate } from "./convertUnits.js";

// export const filterForecastWeatherData = async (forecastWeatherData) => {
//   const forecastWeatherSection = document.querySelector(".weather__forecast");
//   const prevFilterContainer = document.querySelector(".weather__forecast-filter-container");
//   const specialDates = new Set(["All Days"]);

//   if (prevFilterContainer) {
//     prevFilterContainer.remove()
//   }

//   const filterContainer = document.createElement("div");
//   filterContainer.classList.add("weather__forecast-filter-container");
//   forecastWeatherSection.insertBefore(filterContainer, forecastWeatherSection.firstChild);

//   for (let i = 0; i < forecastWeatherData.list.length; i++) {
//     specialDates.add(await formatDate(forecastWeatherData.list[i].dt, "short"));
//   }

//   filterContainer.addEventListener("wheel", (event) => {
//     event.preventDefault();
//     filterContainer.scrollLeft += event.deltaY * 2;
//   })

//   specialDates.forEach(async (specialDate) => {
//     const filterItem = document.createElement("div");
//     filterItem.classList.add("weather__forecast-filter-item", "dynamic-data");

//     if (specialDate === "All Days") {
//       filterItem.classList.add("active");
//     }

//     filterItem.innerHTML = specialDate;
//     filterContainer.appendChild(filterItem);
//   })

//   const filterItems = document.querySelectorAll(".weather__forecast-filter-item");
//   filterItems.forEach(async (filterItem) => {
//     filterItem.addEventListener("click", async () => {
//       filterItems.forEach(async (filterItem) => {
//         filterItem.classList.remove("active");
//       });
//         if (filterItem.innerHTML === "All Days") {
//           filterItem.classList.add("active");
//         } else {
//           filterItem.classList.add("active");
//         }
//       })
//     })
// }
 
export const filterForecastWeatherData = async (forecastWeatherData) => {
  const forecastWeatherSection = document.querySelector(".weather__forecast");
  const prevFilterContainer = document.querySelector(".weather__forecast-filter-container");
  const specialDates = new Set(["All Days"]);

  if (prevFilterContainer) {
    prevFilterContainer.remove();
  }

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("weather__forecast-filter-container");
  forecastWeatherSection.insertBefore(filterContainer, forecastWeatherSection.firstChild);

  let filterValue = 0; // Initialize the filterValue variable with 0
  for (let i = 0; i < forecastWeatherData.list.length; i++) {
    specialDates.add(await formatDate(forecastWeatherData.list[i].dt, "short"));
  }

  filterContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    filterContainer.scrollLeft += event.deltaY * 2;
  });

  specialDates.forEach(async (specialDate) => {
    const filterItem = document.createElement("div");
    filterItem.classList.add("weather__forecast-filter-item", "dynamic-data");

    if (specialDate === "All Days") {
      filterValue = ""; // Set an empty value for "All Days"
      filterItem.classList.add("active");
    } else {
      filterItem.classList.remove("active"); // Remove "active" class for non-"All Days" items
    }

    filterItem.innerHTML = specialDate;
    filterItem.setAttribute("data-value", filterValue); // Set the value attribute
    filterContainer.appendChild(filterItem);

    // Increment the filterValue for the next item
    filterValue++;
  });

  const filterItems = document.querySelectorAll(".weather__forecast-filter-item");
  filterItems.forEach(async (filterItem) => {
    filterItem.addEventListener("click", async () => {
      filterItems.forEach(async (filterItem) => {
        filterItem.classList.remove("active");
      });

      if (filterItem.innerHTML === "All Days") {
        filterItem.classList.add("active");
      } else {
        filterItem.classList.add("active");
      }
    });
  });
}

