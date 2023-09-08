//! ======== msToHours ASYNC !!! ========
// export const msToHours = async(ms) => {
//     const hours = Math.floor( (ms / (1000 * 60 * 60) %  24) ),
//           minutes = Math.floor( (ms / 1000 / 60) % 60);

//     const formattedHours = (hours < 10) ? "0" + hours : hours;
//     const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

//     return `${formattedHours}:${formattedMinutes}`;
// }

export function msToHours(ms) {
	const hours = Math.floor((ms / (1000 * 60 * 60) % 24)),
		minutes = Math.floor((ms / 1000 / 60) % 60);

	const formattedHours = (hours < 10) ? "0" + hours : hours;
	const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;

	return `${formattedHours}:${formattedMinutes}`;
}


export function getCurrFormattedDate() {
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


//! ======== metersToKm ASYNC !!! ========
// export const metersToKm = async (meters) => {
//   return `${meters / 1000} km`;
// }

export function metersToKm(meters) {
	return `${meters / 1000} km`;
}


//! ======== roundDegree ASYNC !!! ========
// export const roundDegree = async (degree) => {
//   if ((Math.round(degree * 10) / 10) % 1 === 0) {
//     return `${(Math.round(degree * 10) / 10).toFixed(1)}°C`;
//   } else {
//     return `${Math.round(degree * 10) / 10}°C`;
//   }
// }

export function roundDegree(degree) {
	if ((Math.round(degree * 10) / 10) % 1 === 0) {
		return `${(Math.round(degree * 10) / 10).toFixed(1)} °C`;
	} else {
		return `${Math.round(degree * 10) / 10} °C`;
	}
}