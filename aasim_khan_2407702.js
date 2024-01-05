/**
* Student Name: Aasim Khan
* Student ID: 2407702
*/

//fetching data from open weather API
const apiKey = "c074bbfa96105b9023b3617c2adefa81";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const responseData = await response.json();

        if (response.status === 404) {
            const invalidMessage = document.querySelector('.errorsection');
            invalidMessage.style.display = "block";
            console.log(responseData);  // Log the response data
        } else {
            const invalidMessage = document.querySelector('.errorsection');
            console.log(responseData);
            invalidMessage.style.display = "none";


            //Event listener for close button
            const closeButton = document.querySelector(".close");
            closeButton.addEventListener("click", () => document.querySelector(".errorsection").style.display= "none");

            // ... Rest of the code using responseData instead of data

            document.querySelector(".city").innerHTML = responseData.name + ",";
            document.querySelector(".temp").innerHTML = Math.round(responseData.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = responseData.main.humidity + "%";
            document.querySelector(".wind").innerHTML = responseData.wind.speed + " Km/hr";
            document.querySelector(".pressure").innerHTML = responseData.main.pressure + " hPa";
            document.getElementById("country").innerHTML = responseData.sys.country;
            document.querySelector(".desc").innerHTML = responseData.weather[0].description;

            // Weather icon based on weather condition
            if (responseData.weather[0].main === "Clouds") {
                weatherIcon.src = "https://raw.githubusercontent.com/aasimk910/weather-icon/main/clouds.png";
            } else if (responseData.weather[0].main === "Clear") {
                weatherIcon.src = "https://raw.githubusercontent.com/aasimk910/weather-icon/main/clear.png";
            } else if (responseData.weather[0].main === "Rain") {
                weatherIcon.src = "https://raw.githubusercontent.com/aasimk910/weather-icon/main/rain.png";
            } else if (responseData.weather[0].main === "Drizzle") {
                weatherIcon.src = "https://raw.githubusercontent.com/aasimk910/weather-icon/main/drizzle.png";
            } else if (responseData.weather[0].main === "Mist") {
                weatherIcon.src = "https://raw.githubusercontent.com/aasimk910/weather-icon/main/mist.png";
            }

            // Displaying time and date
            let timestampOffset = responseData.timezone;
            const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
            const date = new Date(timestamp * 1000);

            const localDateTime = date.toLocaleDateString('en-us', {
                timeZone: 'UTC',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });

            console.log(localDateTime);
            document.querySelector('.date-time').innerHTML = localDateTime;
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});



// Initial check for a default city (Glasgow)
checkWeather("Glasgow");