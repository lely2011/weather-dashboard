var apiKey = '1b61eb279c61c5f1b178ad4f924c7c9f';
var city = document.querySelector("weatherdata");
var searchBtn = document.querySelector('search-btn');
var weatherData = document.querySelector("ul");
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;


let searchHx = [];

// Load search histoy
function loadSearchHx() {
    return localStorage.getItem('weatherSearchHx');
}

function storeSearchHx(newSearchHx) {
    localStorage.setItem('weatherSearchHx', newSearchHx);
}

// Display search data
function displayWeatherData(weatherData) {
    // TODO add code to add weather data to page
    inputCity = document.getElementById("myInput").value;
    hxList = getInfo();

    if (hxList.includes(inputCity) === false){
        $(".history").append(searchData)
    }
}

// Create click even handler
function handleSearchBtnClick() {
    // grab city name from form
    cityName = $('input').val();
    // make API request to get lat/long from cityname
    // Details: https://openweathermap.org/forecast5#name5
    // make API request to get 5-day forecast from lat/long
    // Details: https://openweathermap.org/forecast5
    weatherData = await fetch(/* *** */);

    // Save data to local storage
    searchHx[cityName] = weatherData;
    storeSearchHx(searchHx);
    // TODO display new city in search Hx

    displayWeatherData({ city: cityName, data: weatherData })

}


function handleSearchHxBtnClick(event) {
    const cityName = event.target.value;
    const searchData = searchHx[cityName];
    displayWeatherData({ city: cityName, data: searchData });
}

// load search Hx
searchHx = loadSearchHx();
Object.keys(searchHx).forEach((cityName) => {
    const searchData = searchHx[cityName];
    // TODO add code to add btn for this city
    $(HxBtn).click(handleSearchBtnClick);
})

// activate click eventhandler from btn
$('search-btn').click(handleSearchBtnClick);






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



