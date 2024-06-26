const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".DataCard");

const apiKey = "38ea6e2203325de3b75d8b7393a4b053";

weatherForm.addEventListener("submit", async (e) => {

    e.preventDefault(); //prevent Refresh behaviour

    const city = cityInput.value;

    if (city) {

        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }

        catch (error) {
            console.log(error);
            displayError(error);
        }

    }

    else {

        displayError("Please enter a valid City!")

    }



});


async function getWeatherData(CITY) {

    const requestURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${CITY}`;

    const response = await fetch(requestURL);

    if (!response.ok) {
        throw new Error("Could Not get Weather for the City!!");
    }

    return await response.json();

}



function convertKelvin(KelvinValue) {

    const CELSIUS = (KelvinValue - 273.15)
    const FAHRENHEIT = ((KelvinValue - 273.15) * (1.8) + 32)

    return {"CELSIUS": CELSIUS , "FAHRENHEIT": FAHRENHEIT}

}





function displayWeatherInfo(DATA) {

    const {name: city,
           main: { temp, humidity },
           weather: [{ description, id }] } = DATA;
    
        
    card.textContent = ""; // To reset from the previous displayed stuff
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");


    cityDisplay.textContent = city;
    // tempDisplay.textContent = `${convertKelvin(temp).CELSIUS}°C`;
    tempDisplay.textContent = `${Math.round(((convertKelvin(temp).CELSIUS) + Number.EPSILON) * 100) / 100}°C`;
    humidityDisplay.textContent = `Humidity : ${humidity}%`
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id); // pass a weather ID





    cityDisplay.classList.add("nameDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");




    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);




}

function getWeatherEmoji(WeatherID) {


    switch(true) {
        case (WeatherID >= 200 && WeatherID < 300): // ThunderStorm
            return "⛈️";

        case (WeatherID >= 300 && WeatherID < 400): // Drizzel
            return "🌦️";

        case (WeatherID >= 500 && WeatherID < 600): // Drizzel
            return "🌧️";

        case (WeatherID >= 600 && WeatherID < 700): // Drizzel
            return "🌨️";

        case (WeatherID >= 700 && WeatherID < 800): // Drizzel
            return "🌫️";

        case (WeatherID === 800): // Drizzel
            return "☀️";
    
        case (WeatherID >= 801 && WeatherID < 810): // Drizzel
            return "☁️";

        default:
            return "❓";
    }



}

function displayError(message) {


    const errDisplay = document.createElement("p");

    errDisplay.textContent = message;

    // Addint the CSS VIA the selectors that were mentioned in the style.css sheet

    errDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errDisplay);


}