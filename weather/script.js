const city = document.getElementById("city");
const forecast = document.getElementById("forecast");
// const forecastDate = forecast.querySelector(".date");
const forecastHighLow = forecast.querySelector("#high-low");
const forecastDaytime = forecast.querySelector("#daytime");
const forecastNighttime = forecast.querySelector("#nighttime");
let periodIndex = 0;
city.value = JSON.parse(localStorage.getItem("weather-city"));

async function getWeather() {
    forecastHighLow.innerHTML = "Loading...";
    localStorage.setItem("weather-city", JSON.stringify(city.value));
    try {
        if (periodIndex < 0) periodIndex = 0;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city.value)}`;
        const cityResponse = await fetch(url, { headers: { "User-Agent": "LucaPooka Weather App (Project)" } });
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
        forecastHighLow.innerHTML = `High: ${forecastToday.temperature}° | Low: ${forecastTonight.temperature}°`;
        function showForecast(timeElement, forecast) {
            timeElement.querySelector(".time").innerHTML = `${forecast.name}:`;
            timeElement.querySelector(".detailed").innerHTML = `Summary:<br>${forecast.detailedForecast}`;
            timeElement.querySelector(".forecast").innerHTML = `${forecast.temperature}° — ${forecast.shortForecast}`;
            timeElement.querySelector(".precipitation").innerHTML = `Chance of precipitation: ${forecast.probabilityOfPrecipitation.value}%`;
            timeElement.querySelector(".wind").innerHTML = `Wind Speed: ${forecast.windSpeed} — ${forecast.windDirection}`;
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