// API stuff
const apiKey = '1db4d945820f53dd2e113270feba3b9f';
const apiCurrentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// variables
const zipCodeInput = document.getElementById('zipBox');
const zipCodeButton = document.getElementById('zipButton');
const currentTime = Date.now();
const today = new Date(currentTime);
const weatherIcon = document.querySelector(".weatherIcon")
const lowTempIcon = document.querySelector(".lowIcon")
const highTempIcon = document.querySelector(".highIcon")
const inputPrompt = document.querySelector('.PUN')

//function to get weather data
async function weatherData(zipCode) {
    const response = await fetch(apiCurrentWeatherUrl + zipCode + `,US&units=imperial&appid=${apiKey}`);
    let dataPoints = await response.json();

    //check to see response was successful
    if (response.ok) {
        document.querySelector('.city').innerHTML = dataPoints.name; //if so, populates these items
        document.querySelector('.date').innerHTML = today.toDateString();
        document.querySelector('.condition').innerHTML = dataPoints.weather[0].main;
        document.querySelector('.description').innerHTML = dataPoints.weather[0].description;
        document.querySelector('.temperature').innerHTML ='Current: ' + Math.round(dataPoints.main.temp) + '°F';
        lowTempIcon.src ='low-temperature-cold-hot-temperature-svgrepo-com.svg';
        document.querySelector('.lTemp').innerHTML ='Lo: ' + Math.round(dataPoints.main.temp_min) + '°F';
        highTempIcon.src = 'high-temperature-cold-hot-temperature-svgrepo-com.svg';
        document.querySelector('.hTemp').innerHTML ='Hi: ' + Math.round(dataPoints.main.temp_max) + '°F';
    // changes the weather icon based the main weather description
        if ( dataPoints.weather[0].main == 'Thunderstorm') {
        weatherIcon.src = 'thunder.svg';
    }
        if ( dataPoints.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'rainy-4.svg';
    }
        if ( dataPoints.weather[0].main == 'Rain') {
        weatherIcon.src = 'rainy-7.svg';
    }
        if ( dataPoints.weather[0].main == 'Snow') {
        weatherIcon.src = 'snowy-6.svg';
    }
        if ( dataPoints.weather[0].main == 'Mist' ||
        dataPoints.weather[0].main == 'Smoke' ||
        dataPoints.weather[0].main == 'Haze' ||
        dataPoints.weather[0].main == 'Dust' ||
        dataPoints.weather[0].main == 'Fog' ||
        dataPoints.weather[0].main == 'Sand' ||
        dataPoints.weather[0].main == 'Dust' ||
        dataPoints.weather[0].main == 'Ash' ||
        dataPoints.weather[0].main == 'Squall' ||
        dataPoints.weather[0].main == 'Tornado') {
        weatherIcon.src = 'weather.svg';
    }
        if ( dataPoints.weather[0].main == 'Clear') {
        weatherIcon.src = 'day.svg';
    }
        if ( dataPoints.weather[0].main == 'Clouds') {
        weatherIcon.src = 'cloudy.svg';
    }
    }; else { //if the response was unsuccessful, clear items below and populates error message above text input
        document.querySelector('.city').innerHTML = '';
        document.querySelector('.date').innerHTML = '';
        document.querySelector('.condition').innerHTML = '';
        document.querySelector('.description').innerHTML = '';
        document.querySelector('.temperature').innerHTML ='';
        lowTempIcon.src = '';
        document.querySelector('.lTemp').innerHTML ='';
        highTempIcon.src = '';
        document.querySelector('.hTemp').innerHTML ='';
        weatherIcon.src = '';
        inputPrompt.innerHTML = 'Invalid ZIP code. Please try again.';
    };
}

//Event listener
zipCodeButton.addEventListener('click', ()=> {
    let zipCodeInputValue = document.getElementById('zipBox').value;
    if (zipCodeInputValue = '' ||
        zipCodeInputValue.length <5) {
        alert('You forgot something!');
    } else {
        inputPrompt.innerHTML = '';
        weatherData(zipCodeInput.value);
    }
});

