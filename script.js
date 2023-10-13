const url = "https://api.weatherapi.com/v1/current.json?key=98efa64a40434a5a9a8170303230710&q=Zaporizhzhya"

async function getWeather() {
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
        } else {
            console.log('server error ', data.error.message);
        }
    } catch (error) {
        console.log(error);
    }
}

getWeather();