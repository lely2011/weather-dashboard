function initPage() {
    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-Btn");
    const clearEl = document.getElementById("clear-Hx");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");

    var fiveDayEl = document.getElementById("fiveday-header");
    var todayWeatherEl = document.getElementById("today-weather");
    let searchHx = JSON.parse(localStorage.getItem("search")) || [];

    // Unique API key
    const APIKey = "1b61eb279c61c5f1b178ad4f924c7c9f";

    function getWeather (cityName) {
        // current weather get rquest from open weather api
        let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {
                todayWeatherEl.classList.remove("d-none");

                // Response to display current weather
                const currentDate = new Date(response.data.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() +1;
                const year = curentDate.getFullYear();
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPicEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Temperature: " + k2f(respnse.data.main.temp) + "&#176F";
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

                // UV index
                let latitude = response.data.coord.latitude;
                let longitude = response.data.coord.longitude;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function (response) {
                        let UVIndex = document.createElement("span");

                        // indicators: good = green; ok = yellow; bad = red
                        if (response.data[0].value < 4 ) {
                            UVIndex.setAttribute("class", "badge badge-success");
                        }
                        else if (response.data[0].value < 8) {
                            UVIndex.setAttribute("class", "badge badge-warning");
                        }
                        else {UVIndex.setAttribute("class", "badge badge-danger")};
                        console.log(response.data[0].value)
                        UVIndex.innerHTML = response.data[0].value;
                        currentUVEl.innerHTML = "UV Index: ";
                        currentUVEl.append(UVIndex);
                    });

                // Getting 5 Day forecast
                let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/focast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                        fiveDayEl.classList.remove("d-none");

                        // displaying forecast for next 5 days
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth();
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                            // Icons for current weather
                            const forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastEls[i].append(forecastWeatherEl);

                            const forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastEls[i].append(forecastHumidityEl);
                        };
                    });
            });
    };

    // Get Hx from local storage
    searchEl.addEventListener("click", function () {
        const searchTerm = cityEl.value;
        getWeather(searchTerm);
        searchHx.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHx));
        renderSearchHx();
    })

    // Clear Hx Btn
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHx = [];
        renderSearchHx();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function renderSearchHx() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHx.length; i++) {
            const hxItem = document.createElement("input");
            hxItem.setAttribute("type", "text");
            hxItem.setAttribute("readonly", true);
            hxItem.setAttribute("class", "form-control d-block bg-white");
            hxItem.setAttribute("value", searchHx[i]);
            hxItem.addEventListener("click", function () {
                getWeather(hxItem.value);
            })
            historyEl.append(hxItem);
        }
    }

    renderSearchHx();
    if (searchHx.length > 0) {
        getWeather(searchHx[searchHx.length - 1]);
    }
};

initPage();




















// var apiKey = "1b61eb279c61c5f1b178ad4f924c7c9f";
// var city = document.querySelector("weatherdata");
// var searchBtn = document.querySelector('search-btn');
// var weatherData = document.querySelector("ul");
// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;


// let searchHx = [];

// // Load search histoy
// function loadSearchHx() {
//     return localStorage.getItem('weatherSearchHx');
// }

// function storeSearchHx(newSearchHx) {
//     localStorage.setItem('weatherSearchHx', newSearchHx);
// }

// // Display search data
// function displayWeatherData(weatherData) {
//     // TODO add code to add weather data to page
//     inputCity = document.getElementById("myInput").value;
//     hxList = getInfo();

//     if (hxList.includes(inputCity) === false){
//         $(".history").append(searchData)
//     }
// };

// // Create click event handler
// function handleSearchBtnClick() {
//     // grab city name from form
//     cityName = $('input').val();
//     // make API request to get lat/long from cityname
//     // Details: https://openweathermap.org/forecast5#name5
//     // make API request to get 5-day forecast from lat/long
//     // Details: https://openweathermap.org/forecast5
//     weatherData = await fetch(/* *** */);

//     // Save data to local storage
//     searchHx[cityName] = weatherData;
//     storeSearchHx(searchHx);
//     // TODO display new city in search Hx

//     displayWeatherData({ city: cityName, data: weatherData })

// }


// function handleSearchHxBtnClick(event) {
//     const cityName = event.target.value;
//     const searchData = searchHx[cityName];
//     displayWeatherData({ city: cityName, data: searchData });
// }

// // load search Hx
// searchHx = loadSearchHx();
// Object.keys(searchHx).forEach((cityName) => {
//     const searchData = searchHx[cityName];
//     // TODO add code to add btn for this city
//     $(HxBtn).click(handleSearchBtnClick);
// })

// // activate click eventhandler from btn
// $('search-btn').click(handleSearchBtnClick);


// var cityName = document.querySelector('.city-name');
// var CurrentTemp = document.querySelector('.temp');
// const WeatherURL = "http://api.openweathermap.org/geo/1.0/direct?q=limit={5}&appid="
// const URLKey = "556f3d72ecc06a482fcd2b348d876f53"


// fetch(WeatherURL + URLKey)
//     .then(Response =>{
//         return Response.json();
//     })
//     // .then(data => {
//     //     const {}
//     // })



