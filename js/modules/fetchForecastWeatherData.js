import { filterForecastWeatherData } from "./filterForecastWeatherData.js";
import { roundDegree, formatDate } from "./convertUnits.js";
import { drawForecastWeatherGrafic } from "./drawForecastWeatherGrafic.js";

export const fetchForecastWeatherData = async (data, key) => {
  const hourlyForecastWeatherDate = document.querySelectorAll("#hourDate");
  const hourlyForecastWeatherTime = document.querySelectorAll("#hourTime");
  const hourlyForecastWeatherTemp = document.querySelectorAll("#hourTemp");

  let API_URL;

  if (data.lat && data.lon) {
    API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=${key}&units=metric`;
  } else {
    API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${key}&units=metric`;
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Sorry, we couldn't find ${data}. Please double-check the spelling and try again.`);
    } else {
      throw new Error(
        "Oops! We're having trouble getting the latest weather information right now. Please try again later or contact support if the problem persists."
      );
    }
  }

  const fetchForecastWeatherData = await response.json();
  await filterForecastWeatherData(fetchForecastWeatherData);

  for (let index = 0; index < 5; index++) {
    hourlyForecastWeatherDate[index].innerHTML = await formatDate(fetchForecastWeatherData.list[index].dt, "day");
    hourlyForecastWeatherTime[index].innerHTML = await formatDate(fetchForecastWeatherData.list[index].dt, "hour");
    hourlyForecastWeatherTemp[index].innerHTML = await roundDegree(fetchForecastWeatherData.list[index].main.temp);
  }


  //! OLD
  // const graficDataSet = [];
  // for (let index = 0; index < 40; index++) {
  //   const datetimeSet = `${await formatDate(fetchForecastWeatherData.list[index].dt, "short")}  ${await formatDate(fetchForecastWeatherData.list[index].dt, "hour")}`;
  //   const temporaryDataSet = {
  //     'date' : datetimeSet,
  //     'temp' : await roundDegree(fetchForecastWeatherData.list[index].main.temp),
  //   };

  //   graficDataSet.push(temporaryDataSet);
  // }
  // console.log(graficDataSet);
  // await drawForecastWeatherGrafic(graficDataSet, 'all');


  //! NEW 
  const graficDataSet = {};
  for (let index = 0; index < 40; index++) {
    const datetimeSet = `${await formatDate(fetchForecastWeatherData.list[index].dt, "short")}  ${await formatDate(fetchForecastWeatherData.list[index].dt, "hour")}`;
    const temp = await roundDegree(fetchForecastWeatherData.list[index].main.temp);
    graficDataSet[datetimeSet] = temp.slice(0, -2);
  }
  console.log(graficDataSet);
  await drawForecastWeatherGrafic(graficDataSet);
}