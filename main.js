const api = {                                         //Api key and base URl 
    key: "6c891e9b02e17344b7f81c8435069ec9",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box')              //Added event listener to the search box for searching the names of cities
searchbox.addEventListener('keypress', Query)              

function Query (evnt) {                            //Function created for search event
    if (evnt.keyCode == 13) {
    getResults(searchbox.value);
    }
}

// function getResults(query) {}   getresults is a function name and parameter is passed in it i.e query 

function getResults (query) {                        //Function created to fetch the result after search event has been created and then print out the results
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()   ;                    //after query, weather is returned in the form of json data
    }).then(displayResults);                        //then the results are displayed throught the function displayResults
}

function displayResults (weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c<span>`;

    let weather_type = document.querySelector('.current .weather');
    weather_type.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder (d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];                      //these are inbuilt JS functions
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

}