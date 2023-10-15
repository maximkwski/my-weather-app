const url = 'https://api.weatherapi.com/v1/current.json?key=98efa64a40434a5a9a8170303230710&q=';
let locationVal = 'Saint Petersburg Fl';

const input = document.querySelector('input#location');
const submitBtn = document.querySelector('input#submit');
let city = document.querySelector('.city');
let country = document.querySelector('.country');
let localtime = document.querySelector('.localtime');
let condition = document.querySelector('.condition-text');
let conditionIcon = document.querySelector('.icon');
let temp = document.querySelector('.temp');
let tempUnit = document.querySelector('.temp>span');
let feelsLike = document.querySelector('.feels-like');
let unitCels = document.querySelector('.cels');
let unitFahr = document.querySelector('.fahr');
const weatherPng = document.createElement('img');



submitBtn.addEventListener('click', e => {
    locationVal = input.value;
    getWeather();
});

input.addEventListener('keypress', e => {
    if(e.key === 'Enter') {
        submitBtn.click();
    }
});


async function getWeather() {
    try{
        const response = await fetch(url+locationVal);
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
            city.innerHTML = data.location.name;
            country.innerHTML = data.location.country;
            localtime.innerHTML = data.location.localtime;
            condition.innerHTML = data.current.condition.text;
            weatherPng.src = data.current.condition.icon;
            conditionIcon.appendChild(weatherPng);
            
            temp.innerHTML = `${data.current.temp_c}°`;
            feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c}`;
            
        } else {
            console.log('server error: ', data.error.message);
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

getWeather();