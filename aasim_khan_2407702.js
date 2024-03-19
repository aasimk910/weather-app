/**
* Student Name: Aasim Khan
* Student ID: 2407702
*/


document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here

  if (navigator.onLine) {
    console.log("online");
    insertData("Glasgow");
  } else {
    console.log("offline");
    get_from_localstorage("Glasgow");
  }

  //fetching data from open weather API

  const weatherIcon = document.querySelector(".weather-icon");
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");

//   function putData(city) {
//       fetch(`http://localhost/weatherapp/weather_data.php?q=${city}`)

//   }


  async function checkWeather(city) {
      try {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c074bbfa96105b9023b3617c2adefa81&units=metric`); // Adjust the API endpoint

          const responseData = await response.json();
          console.log(responseData);

          const ldata = JSON.stringify(responseData);
          localStorage.setItem(city, ldata)
          if (response.status === 404) {
              const invalidMessage = document.querySelector('.errorsection');
              invalidMessage.style.display = "block";
              console.log(responseData); // Log the response data
          } else {
              const invalidMessage = document.querySelector('.errorsection');
              console.log(responseData);
              invalidMessage.style.display = "none";


              //Event listener for close button
              const closeButton = document.querySelector(".close");
              closeButton.addEventListener("click", () => document.querySelector(".errorsection").style.display = "none");


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

  function get_from_localstorage(city) {
    const curr_data = JSON.parse(localStorage.getItem(city));
    if (curr_data) {
      displayWeatherData(curr_data);
    } else {
      console.log("Data not found in local storage.");
    }
  }

  function displayWeatherData(data) {
    document.querySelector(".city").innerHTML = data.name + ",";
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    document.getElementById("country").innerHTML = data.sys.country;
    document.querySelector(".desc").innerHTML = data.weather[0].description;
  }


async function pastData() {
      const city = document.querySelector(".search input").value;
      console.log("Fetching past data for city:", city);
      pastData(city);
      document.querySelector(".viewpastdata").style.display = "block";
      document.querySelector(".card").style.display = "none";
}

  const closePastButton = document.querySelector(".closepast");
  closePastButton.addEventListener("click", () => {
      document.querySelector(".viewpastdata").style.display = "none";
  });

  // Event listener for the "View Past Data" button
const viewPastDataButton = document.querySelector(".past");
viewPastDataButton.addEventListener("click", () => {
    console.log("View Past Data button clicked"); // Check if the event listener works
    document.querySelector(".viewpastdata").style.display = "block";
    pastData(); // Ensure pastData function is called to display past data
});


  function pastData() {
      fetch(`http://localhost/weatherapp/a.php?q=${searchBox.value}`)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              const weatherList = document.querySelector(".weather-list");
              weatherList.innerHTML = "";

              if (data.length === 0) {
                  const noDataItem = document.createElement("li");
                  noDataItem.textContent = "No data available";
                  weatherList.appendChild(noDataItem);
              } else {
                  const passdataa = document.querySelector(".viewpastdata h2");
                  passdataa.innerHTML = `Past data of ${searchBox.value}`
                  data.forEach((item) => {
                      const weatherItem = document.createElement("li");
                      weatherItem.classList.add("weather-item");

                      const weatherDate = document.createElement("div");
                      weatherDate.classList.add("weather-date");
                      weatherDate.textContent = item.weather_day;

                      const weatherCondition = document.createElement("div");
                      weatherCondition.classList.add("weather-condition");
                      weatherCondition.textContent = item.Weather_condition;

                      const weathertemperature = document.createElement("div");
                      weathertemperature.classList.add("weather-temperature");
                      weathertemperature.innerHTML = `Temp:` + item.Temp + "°C";

                      const weatherhumidity = document.createElement("div");
                      weatherhumidity.classList.add("weather-humidity");
                      weatherhumidity.innerHTML = `Humidity:` + item.Humidity + "pa";

                      weatherItem.appendChild(weatherDate);
                      weatherItem.appendChild(weatherCondition);
                      weatherItem.appendChild(weathertemperature);
                      weatherItem.appendChild(weatherhumidity);

                      weatherList.appendChild(weatherItem);
                  });
              }
          });
  }


  async function insertData(city) {
      await fetch(`http://localhost/weatherapp/a.php?city=${city}`)
          .then((response) => {
              if (response.ok) {
                  console.log("Successful fetch");
              } else {
                  console.log("Fetch not successful");
              }
          })
          .catch((error) => {
              console.error("Error fetching data: ", error);
          });
  }




  // Event listener for the search button
  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    if (navigator.onLine) {
      try {
        insertData(searchBox.value);
      } catch (error) {
        alert("Invalid city");
      }
    } else {
      get_from_localstorage(searchBox.value);
    }
  });


  // Initial check for a default city (Glasgow)
 
  checkWeather("glasgow");
//   putData("glasgow");
});
