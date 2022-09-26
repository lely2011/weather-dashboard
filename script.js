var cityName = document.querySelector('.city-name');
var CurrentTemp = document.querySelector('.temp');
const WeatherURL = "http://api.openweathermap.org/geo/1.0/direct?q=limit={5}&appid="
const URLKey = "556f3d72ecc06a482fcd2b348d876f53"


fetch(WeatherURL + URLKey)
    .then(Response =>{
        return Response.json();
    })
    // .then(data => {
    //     const {}
    // })
