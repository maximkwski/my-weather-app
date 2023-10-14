const url = 'https://api.weatherapi.com/v1/current.json?key=98efa64a40434a5a9a8170303230710&q=';
let locationVal = 'Saint Petersburg Fl';

const info = document.querySelector('.weather-data>p');
const input = document.querySelector('input#location');
const submitBtn = document.querySelector('input#submit');

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
            info.innerHTML = data.location.name + ' ' + data.current.condition.text;
            
        } else {
            console.log('server error: ', data.error.message);
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

getWeather();