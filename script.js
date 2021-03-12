const daysDisplay = document.querySelector(".days-left");
const hoursDisplay = document.querySelector(".hours-left");
const minsDisplay = document.querySelector(".mins-left");
const secsDisplay = document.querySelector(".secs-left");
const startCountdownBtn = document.querySelector(".start-countdown-btn");
const modal = document.querySelector(".modal-form");
const backdrop = document.querySelector(".backdrop");
const settingsBtn = document.querySelector(".settings");
const dateInput = document.querySelector("#date-input");
const timeInput = document.querySelector("#time-input");

const setLaunch = () => {
	const launchDate = dateInput.value;
	const launchTime = timeInput.value;
	const launch = moment(`${launchDate} ${launchTime}`);

	return launch;
};

const setDateAndTimeInputs = () => {
	const dateInput = document.querySelector("#date-input");
	const timeInput = document.querySelector("#time-input");

	const now = moment();
	dateInput.value = now.add(1, "d").format("YYYY-MM-DD");
	dateInput.setAttribute("min", now.format("YYYY-MM-DD"));
	dateInput.setAttribute("max", now.endOf("month").format("YYYY-MM-DD"));

	timeInput.value = moment().format("HH:mm");
};

const handleModalAndBackdrop = (display) => {
	modal.style.display = display;
	backdrop.style.display = display;
};

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

const manageCountdownDisplay = (display, titleText) => {
	const countdown = document.querySelector(".countdown");
	countdown.style.display = display;
	const title = document.querySelector(".title");
	title.innerText = titleText;
};

const calculatePeriodLeft = () => {
	const now = moment();
	const launch = setLaunch();

	const duration = moment.duration(launch.diff(now));
	if (duration < 0) {
		manageCountdownDisplay("none", "LAUNCH IS OVER!");
		return;
	}

	const daysLeft = duration.days();
	const hoursLeft = duration.hours();
	const minsLeft = duration.minutes();
	const secsLeft = duration.seconds();

	updateCountdown(daysLeft, hoursLeft, minsLeft, secsLeft);
};

document.addEventListener("DOMContentLoaded", () => {
	updateCountdown("0", "0", "0", "0");
	setDateAndTimeInputs();
});

startCountdownBtn.addEventListener("click", (e) => {
	e.preventDefault();
	handleModalAndBackdrop("none");
	calculatePeriodLeft();
	manageCountdownDisplay("flex", "WE'RE LAUNCHING SOON");
	setInterval(calculatePeriodLeft, 1000);
});

settingsBtn.addEventListener("click", () => {
	handleModalAndBackdrop("flex");
});
