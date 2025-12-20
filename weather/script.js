const city = document.getElementById("city");
const weather = document.getElementById("weather");
const forecast = document.getElementById("forecast");
// const forecastDate = forecast.querySelector(".date");
const forecastHighLow = forecast.querySelector("#high-low");
const forecastDaytime = forecast.querySelector("#daytime");
const forecastNighttime = forecast.querySelector("#nighttime");
let periodIndex = 0;
city.value = JSON.parse(localStorage.getItem("weather-city"));

const date = new Date();
const daysHolder = document.getElementById("days-holder");
const daysList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
for (let index = 0; index < 7; index++) {
    const dayNumber = (date.getDay() + index) % 7;
    const button = document.createElement("button");
    button.className = `day day${index}`;
    if (index === 0) button.classList.add("selected");
    button.innerHTML = daysList[dayNumber];
    button.onclick = () => daySet(index * 2);
    daysHolder.appendChild(button);
    console.log(daysList[dayNumber]);
}

async function getWeather() {
    weather.style.display = "block";
    forecastHighLow.innerHTML = "Loading...";
    for (let index = 0; index < 7; index++) {
        const day = daysHolder.querySelector(`.day${index}`);
        day.classList.remove("selected");
        if (Math.floor(periodIndex / 2) === index) day.classList.add("selected");
    }
    localStorage.setItem("weather-city", JSON.stringify(city.value));
    try {
        if (periodIndex < 0) periodIndex = 0;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city.value)}`;
        const cityResponse = await fetch(url, { headers: { "User-Agent": "LucaPooka Weather Project" } });
        const cityData = await cityResponse.json();
        console.log(cityData);
        if (cityData.length === 0) throw new Error("City not found.");
        const latitude = cityData[0].lat;
        const longitude = cityData[0].lon;

        const weatherResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
        if (!weatherResponse.ok) throw new Error("Location not found.");
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        const forecastURL = weatherData.properties.forecast;
        // const forecastHourlyURL = weatherData.properties.forecastHourly;
        console.log(forecastURL);
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();
        console.log(forecastData);
        const forecastPeriods = forecastData.properties.periods;
        const forecastToday = forecastPeriods[periodIndex];
        const forecastTonight = forecastPeriods[periodIndex + 1];
        console.log(forecastTonight.name);
        forecastHighLow.innerHTML = `High: ${forecastToday.temperature}°${forecastToday.temperatureUnit} | Low: ${forecastTonight.temperature}°${forecastToday.temperatureUnit}`;
        function showForecast(timeElement, forecast) {
            timeElement.querySelector(".time").innerHTML = `${forecast.name}:`;
            timeElement.querySelector(".forecast").innerHTML = `${forecast.temperature}° — ${forecast.shortForecast}`;
            timeElement.querySelector(".precipitation").innerHTML = `Chance of precipitation: ${forecast.probabilityOfPrecipitation.value}%`;
            timeElement.querySelector(".wind").innerHTML = `Wind Speed: ${forecast.windSpeed} — ${forecast.windDirection}`;
            timeElement.querySelector(".detailed").innerHTML = `Summary:<br>${forecast.detailedForecast}`;
        }
        showForecast(forecastDaytime, forecastToday);
        if (forecastToday.isDaytime) { // if that forecast was for the daytime, show the next forecast for the nighttime
            showForecast(forecastNighttime, forecastTonight);
        } else {
            periodIndex--;
        }
        console.log(forecastToday.name, forecastToday.temperature, forecastToday.shortForecast);
    } catch (error) {
        console.error(error);
        forecastHighLow.innerHTML = error;
    }
}
function dayChange(change) {
    periodIndex += change;
    getWeather();
}
function daySet(set) {
    periodIndex = set;
    getWeather();
}