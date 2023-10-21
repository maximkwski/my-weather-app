const url = 'https://api.weatherapi.com/v1/current.json?key=98efa64a40434a5a9a8170303230710&q=';
let locationVal = 'Saint Petersburg Fl';

let weatherInfo = JSON.parse(localStorage.getItem('weatherInfo')) || locationVal;
function saveWeather(location) {
    localStorage.setItem('weatherInfo', JSON.stringify(location));
}

const input = document.querySelector('input#location');
const submitBtn = document.querySelector('button#submit');
let city = document.querySelector('.city');
let country = document.querySelector('.country');
let localtime = document.querySelector('.localtime');
let condition = document.querySelector('.condition-text');
let conditionIcon = document.querySelector('.icon');
let temp = document.querySelector('.temp');
let feelsLike = document.querySelector('.feels-like');
let celsDiv = document.querySelector('.cel');
let fahrDiv = document.querySelector('.fah');
const weatherPng = document.createElement('img');

let unitCels = document.querySelector('#cels');
unitCels.checked = true;
celsDiv.classList.add('selected');
let unitFahr = document.querySelector('#fahr');



submitBtn.addEventListener('click', e => {
    locationVal = input.value;
    saveWeather(locationVal);
    getWeather(locationVal);
    input.value = '';
});

input.addEventListener('keypress', e => {
    if(e.key === 'Enter') {
        submitBtn.click();
    }
});


async function getWeather(loc) {
    try{
        const response = await fetch(url+loc);
        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
            city.innerHTML = data.location.name;
            country.innerHTML = data.location.country;
            
            const timeData = data.location.localtime;
            const [date, time] = timeData.split(" ");
            const [year, month, day] = date.split('-');
            const dateData = `${month}/${day}`;
            localtime.innerHTML = `${time} ${dateData}`;
            condition.innerHTML = data.current.condition.text;
            weatherPng.src = data.current.condition.icon;
            conditionIcon.appendChild(weatherPng);
            

            if (unitCels.checked) {
                temp.innerHTML = `${data.current.temp_c}°`;
                feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c}°`;
            } else {
                temp.innerHTML = `${data.current.temp_f}°`;
                feelsLike.innerHTML = `Feels like: ${data.current.feelslike_f}°`;
            }
    

            //temp switch 
            celsDiv.addEventListener('click', e => {
                    unitCels.checked = true;
                    temp.innerHTML = `${data.current.temp_c}°`;
                    feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c}°`;
                    fahrDiv.classList.remove('selected');
                    celsDiv.classList.add('selected');
                
            })
            fahrDiv.addEventListener('click', e => {
                    unitFahr.checked = true;
                    temp.innerHTML = `${data.current.temp_f}°`;
                    feelsLike.innerHTML = `Feels like: ${data.current.feelslike_f}°`;
                    celsDiv.classList.remove('selected');
                    fahrDiv.classList.add('selected');
                
            })
            
        } else {
            console.log('server error: ', data.error.message);
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

getWeather(weatherInfo);

