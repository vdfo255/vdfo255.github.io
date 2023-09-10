import { formatDate } from "./convertUnits.js";

export const drawForecastWeatherGrafic = async (data, filter) => {
  const yValues = [];
  const xValues = [];
  const seenDates = new Set();
  const today = new Date();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (filter === '1') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Check if the currentDate matches today
        if (currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth()) {
          yValues.push(data[key]);
          xValues.push(key);
        }

        if (yValues.length < 3 || xValues.length < 3) {
          drawForecastWeatherGrafic(data);
        }
      } else if (filter === '2') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Calculate the date that is one day ahead of today
        const oneDayAhead = new Date(today);
        oneDayAhead.setDate(today.getDate() + 1);

        // Check if the currentDate matches one day ahead of today
        if (
          currentDate.getDate() === oneDayAhead.getDate() &&
          currentDate.getMonth() === oneDayAhead.getMonth()
        ) {
          yValues.push(data[key]);
          xValues.push(key);
        }
      } else if (filter === '3') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Calculate the date that is one day ahead of today
        const oneDayAhead = new Date(today);
        oneDayAhead.setDate(today.getDate() + 2);

        // Check if the currentDate matches one day ahead of today
        if (
          currentDate.getDate() === oneDayAhead.getDate() &&
          currentDate.getMonth() === oneDayAhead.getMonth()
        ) {
          yValues.push(data[key]);
          xValues.push(key);
        }
      } else if (filter === '4') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Calculate the date that is one day ahead of today
        const oneDayAhead = new Date(today);
        oneDayAhead.setDate(today.getDate() + 3);

        // Check if the currentDate matches one day ahead of today
        if (
          currentDate.getDate() === oneDayAhead.getDate() &&
          currentDate.getMonth() === oneDayAhead.getMonth()
        ) {
          yValues.push(data[key]);
          xValues.push(key);
        }
      } else if (filter === '5') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Calculate the date that is one day ahead of today
        const oneDayAhead = new Date(today);
        oneDayAhead.setDate(today.getDate() + 4);

        // Check if the currentDate matches one day ahead of today
        if (
          currentDate.getDate() === oneDayAhead.getDate() &&
          currentDate.getMonth() === oneDayAhead.getMonth()
        ) {
          yValues.push(data[key]);
          xValues.push(key);
        }
      } else if (filter === '6') {
        const parts = key.split(' ');
        const datePart = `${parts[0]} ${parts[1]}`;

        // Convert the datePart to a Date object
        const currentDate = new Date(datePart);

        // Calculate the date that is one day ahead of today
        const oneDayAhead = new Date(today);
        oneDayAhead.setDate(today.getDate() + 5);

        // Check if the currentDate matches one day ahead of today
        if (
          currentDate.getDate() === oneDayAhead.getDate() &&
          currentDate.getMonth() === oneDayAhead.getMonth()
        ) {
          yValues.push(data[key]);
          xValues.push(key);
        }
      } else {
        yValues.push(data[key]);
        xValues.push(key);
      }
    }
  }
  // console.log(yValues);
  // console.log(xValues);

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,0,1)",
        borderColor: "rgba(0,0,0,0.3)",
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 40 } }],
      },
      plugins: {
        subtitle: {
          display: true,
          text: 'Custom Chart Subtitle'
        }
      }

    }
  });

  const filterItems = document.querySelectorAll(".weather__forecast-filter-item");
  filterItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = item.getAttribute("data-value");
      console.log(filterValue);
      drawForecastWeatherGrafic(data, filterValue);
      document.querySelectorAll(".weather__forecast-canvas").innerHTML = document.querySelectorAll(".weather__forecast-canvas").innerHTML;
    })
  })
}