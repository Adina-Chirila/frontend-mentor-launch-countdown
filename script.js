const daysDisplay = document.querySelector(".days-left");
const hoursDisplay = document.querySelector(".hours-left");
const minsDisplay = document.querySelector(".mins-left");
const secsDisplay = document.querySelector(".secs-left");
const startCountdownBtn = document.querySelector(".start-countdown-btn");
const modal = document.querySelector(".modal-form");
const backdrop = document.querySelector(".backdrop");

//here or in the function?
const dateInput = document.querySelector("#date-input");
const timeInput = document.querySelector("#time-input");

// var m = moment("2011-10-10T10:20:90");
// console.log(m.isValid()); // false
// console.log(m.invalidAt()); // 5 for seconds

const getInputValue = (input) => {
	return input.value;
};

const setLaunch = () => {
	const launchDate = getInputValue(dateInput);
	console.log(launchDate);

	const launchTime = getInputValue(timeInput);
	console.log(launchTime);

	const launch = moment(`${launchDate} ${launchTime}`);

	if (!moment(launchTime, "HH:mm", true).isValid()) {
		console.log("time not valid");
		return;
	}

	// const testIfValid = moment(launch, "YYYY-MM-DD HH:mm", true).isValid();
	// console.log(testIfValid);
	// const launch = moment("2021-03-20 22:00:00");
	// console.log(launch.isValid());

	// if (!moment(launch, "YYYY-MM-DD HH:mm", true).isValid()) {
	// 	console.log("not valid");
	// 	return;
	// }

	return launch;
};

const setDateAndTimeInputs = () => {
	const dateInput = document.querySelector("#date-input");
	const timeInput = document.querySelector("#time-input");

	const now = moment();
	dateInput.setAttribute("min", now.add(1, "d").format("YYYY-MM-DD"));
	dateInput.value = now.format("YYYY-MM-DD");
	// dateInput.setAttribute("max", now.format("YYYY-MM-DD"));

	timeInput.value = now.format("HH:mm");
	// timeInput.setAttribute("min", now.add(1, "h").format("HH:mm"));
	// console.log(now.add(1, "h"));
	// console.log(now.add(1, "h").format("HH:mm"));
};

const hideModalAndBackdrop = () => {
	modal.style.display = "none";
	backdrop.style.display = "none";
};

//take values from input
//check if:
//input is not empty
//the date is launch valid
//the date launch date is after the present moment
// moment().isValid();
//Additionally, you can use moment#invalidAt to determine which date unit overflowed.
//m.invalidAt(); // 5 for seconds
// const checkIfAfter = moment(launch).isAfter(now);
// console.log(checkIfAfter);

const formatTime = (time) => {
	let formattedTime = "0";
	if (time < 10) {
		formattedTime += time;
		return formattedTime;
	} else {
		return time;
	}
};

const updateCountdown = (days, hours, mins, secs) => {
	daysDisplay.textContent = formatTime(days);
	hoursDisplay.textContent = formatTime(hours);
	minsDisplay.textContent = formatTime(mins);
	secsDisplay.textContent = formatTime(secs);
};

const calculatePeriodLeft = () => {
	const now = moment();
	const launch = setLaunch();
	// const launch = moment("2021-03-12 22:00:00");
	console.log(launch);

	const duration = moment.duration(launch.diff(now));
	const daysLeft = duration.days();
	const hoursLeft = duration.hours();
	const minsLeft = duration.minutes();
	const secsLeft = duration.seconds();

	updateCountdown(daysLeft, hoursLeft, minsLeft, secsLeft);
};

// setInterval(calculatePeriodLeft, 1000);

document.addEventListener("DOMContentLoaded", () => {
	updateCountdown("0", "0", "0", "0");
	setDateAndTimeInputs();
});

startCountdownBtn.addEventListener("click", (e) => {
	e.preventDefault();
	hideModalAndBackdrop();
	setInterval(calculatePeriodLeft, 1000);
});

//time zone?
//modal to enter launch date
