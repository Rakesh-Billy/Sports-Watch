function updateTime() {
  const hourElement = document.getElementById("hour");
  const MinuteElement = document.getElementById("minute");
  const SecondsElement = document.getElementById("seconds");
  const ampmElement = document.getElementById("ampm");
  const dateElement = document.getElementById("date");
  const dayElement = document.getElementById("day");
  const weatherdateElement = document.getElementById("weatherDate");

  const now = new Date();

  // Time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const currentHour = `${hours}`;
  const currentMinute = `${minutes}`;
  const currentSeconds = `${seconds}`;

  // Date
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDay = days[now.getDay()];
  const currentDate = `${months[now.getMonth()]} ${now.getDate()}`;
  const currentweatherDate = `${days[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()}`;

  // Update the display
  hourElement.textContent = currentHour;
  MinuteElement.textContent = currentMinute;

  SecondsElement.textContent = currentSeconds;
  ampmElement.textContent = ampm;

  dateElement.textContent = currentDate;
  dayElement.textContent = currentDay;

  weatherdateElement.textContent = currentweatherDate;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();

// ----------------STOP-WATCH----------------

let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lastPosition = null;
let totalDistance = 0; // in kilometers
let speed = 0; // in km/h
let calories = 0;
const caloriesPerKm = 50; // Simple assumption: 50 calories burned per kilometer

const timerElement = document.getElementById("timer");
const distanceElement = document.getElementById("distance");
const speedElement = document.getElementById("speed");
const caloriesElement = document.getElementById("calories");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Format time to HH:MM:SS
function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function updateTimer() {
  elapsedTime++;
  timerElement.textContent = formatTime(elapsedTime);

  // Update speed and calories based on distance and time
  if (elapsedTime > 0 && totalDistance > 0) {
    speed = totalDistance / (elapsedTime / 3600); // speed in km/h
    calories = totalDistance * caloriesPerKm;
  }

  // Update displayed metrics
  speedElement.textContent = speed.toFixed(2);
  caloriesElement.textContent = calories.toFixed(0);
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
    resetBtn.disabled = false; // Enable reset when paused
    isRunning = false;
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    startPauseBtn.textContent = "Pause";
    resetBtn.disabled = true; // Disable reset while running
    isRunning = true;

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updateDistance, showError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  totalDistance = 0;
  speed = 0;
  calories = 0;
  lastPosition = null;

  // Reset the UI elements
  timerElement.textContent = formatTime(elapsedTime);
  distanceElement.textContent = totalDistance.toFixed(2);
  speedElement.textContent = speed.toFixed(2);
  caloriesElement.textContent = calories.toFixed(0);

  startPauseBtn.textContent = "Start";
  resetBtn.disabled = true;
  isRunning = false;
}

// Calculate the distance between two GPS coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function updateDistance(position) {
  const { latitude, longitude } = position.coords;

  if (lastPosition) {
    const distanceTraveled = calculateDistance(
      lastPosition.latitude,
      lastPosition.longitude,
      latitude,
      longitude
    );
    totalDistance += distanceTraveled;
    distanceElement.textContent = totalDistance.toFixed(2);
  }

  lastPosition = { latitude, longitude };
}

function showError(error) {
  console.warn(`ERROR(${error.code}): ${error.message}`);
}

// Attach event listeners to the buttons
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);

// ----------------SCREEN-SHIFT----------------

const homeScreen = document.getElementById("home");
const stopwatchScreen = document.getElementById("stopwatch");
const menuScreen = document.getElementById("menu");
const calculatorScreen = document.getElementById("calculator");
const weatherScreen = document.getElementById("weather");
const musicScreen = document.getElementById("musicplayer");
const calenderScreen = document.getElementById("calendar");

const goToTimerBtn = document.getElementById("Startstopbtn");
goToTimerBtn.addEventListener("click", showStopwatchScreen);

// Home button on stopwatch screen
const homeBtn = document.getElementById("homebutn");
homeBtn.addEventListener("click", showHomeScreen);

const menuBtn = document.getElementById("Menubtn");
menuBtn.addEventListener("click", showMenuScreen);

const calciBtn = document.getElementById("calculatorBtn");
calciBtn.addEventListener("click", showCalculatorScreen);

const weathBtn = document.getElementById("weatherBtn");
weathBtn.addEventListener("click", showWeatherScreen);

const stopwatchBtn = document.getElementById("stopwatchBtn");
stopwatchBtn.addEventListener("click", showStopwatchScreen);

const musicplayerhBtn = document.getElementById("musicBtn");
musicplayerhBtn.addEventListener("click", showMusicScreen);

const calenBtn = document.getElementById("calendarBtn");
calenBtn.addEventListener("click", showCalenderScreen);

function showStopwatchScreen() {
  homeScreen.style.display = "none";
  menuScreen.style.display = "none";

  stopwatchScreen.style.display = "flex"; // Show the stopwatch screen
}

// Function to return to home screen
function showHomeScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "flex"; // Show the home screen
}

function showMenuScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "none";
  calculatorScreen.style.display = "none";
  weatherScreen.style.display = "none";
  musicScreen.style.display = "none";
  calenderScreen.style.display = "none";
  menuScreen.style.display = "flex";
}

function showCalculatorScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "none";
  menuScreen.style.display = "none";
  calculatorScreen.style.display = "flex";
}

function showWeatherScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "none";
  menuScreen.style.display = "none";
  weatherScreen.style.display = "flex";
}

function showMusicScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "none";
  menuScreen.style.display = "none";
  musicScreen.style.display = "flex";
}
function showCalenderScreen() {
  stopwatchScreen.style.display = "none";
  homeScreen.style.display = "none";
  menuScreen.style.display = "none";
  calenderScreen.style.display = "flex";
}

// --------------CALCULATOR--------------

function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let currentDisplay = document.getElementById("display").value;
  document.getElementById("display").value = currentDisplay.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

// --------------WEATHER--------------

const apiKey = "8353a839f160b633fe29d9947eb0fac8"; // Replace with your OpenWeather API key

const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-description");
const windSpeedElement = document.getElementById("wind-speed");
const humidityElement = document.getElementById("humidity");

// Function to fetch weather data based on latitude and longitude
function getWeather(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const city = data.name;
      const temp = Math.round(data.main.temp);
      const weatherType = data.weather[0].main;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;

      cityElement.textContent = city;
      tempElement.textContent = `${temp}°`;
      weatherDesc.textContent = weatherType;
      windSpeedElement.textContent = windSpeed;
      humidityElement.textContent = humidity;

      // Set weather icon based on weather type
      let iconUrl;
      switch (weatherType.toLowerCase()) {
        case "clear":
          iconUrl = "https://openweathermap.org/img/wn/01d.png";
          break;
        case "clouds":
          iconUrl = "https://openweathermap.org/img/wn/02d.png";
          break;
        case "rain":
          iconUrl = "https://openweathermap.org/img/wn/09d.png";
          break;
        case "snow":
          iconUrl = "https://openweathermap.org/img/wn/13d.png";
          break;
        case "thunderstorm":
          iconUrl = "https://openweathermap.org/img/wn/11d.png";
          break;
        case "drizzle":
          iconUrl = "https://openweathermap.org/img/wn/10d.png";
          break;
        case "mist":
          iconUrl = "https://openweathermap.org/img/wn/50d.png";
          break;
        default:
          iconUrl = "https://openweathermap.org/img/wn/01d.png";
      }

      weatherIcon.src = iconUrl;
    })
    .catch((error) => {
      cityElement.textContent = "Error fetching data";
      console.error("Error:", error);
    });
}

// Function to get user's location and fetch weather
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon); // Fetch weather for the user's location
      },
      () => {
        cityElement.textContent = "Unable to retrieve location";
      }
    );
  } else {
    cityElement.textContent = "Geolocation is not supported by this browser";
  }
}

// Call the function to fetch weather on page load based on user location
getUserLocation();

// --------------Music--------------

const audioPlayer = document.getElementById("audioPlayer");

function playMusic() {
  audioPlayer.play();
}

function pauseMusic() {
  audioPlayer.pause();
}

function stopMusic() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // Reset the audio to the beginning
}

function setVolume(value) {
  audioPlayer.volume = value;
}

// --------------calender--------------

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function generateCalendar(month, year) {
  const daysGrid = document.getElementById("days-grid");
  const monthYear = document.getElementById("monthYear");
  daysGrid.innerHTML = "";
  monthYear.innerHTML = `${months[month]} ${year}`;

  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill in the days of the previous month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    daysGrid.appendChild(emptyCell);
  }

  // Fill in the days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;

    // Highlight today's date
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    daysGrid.appendChild(dayCell);
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

// Initialize the calendar for the current month
generateCalendar(currentMonth, currentYear);
