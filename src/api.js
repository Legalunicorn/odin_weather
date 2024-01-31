
// async function getWeather(city){
//     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ec0903201e9b40878d632646242901&q=singapore}`,
//     {
//         mode:'cors'
//     })
//     const tf = await response.json();
//     return tf;

// }

const weatherAPI=(()=>{
    const API_KEY = 'ec0903201e9b40878d632646242901'
    let data={}; //async functoin load inside here
    //usaually has to be kept secured but for this project not needed

    //try to make only ONE api fetch call for each query
    const GET_ALL_DATA = async (query)=>{
            const ALL_DATA = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=3`,{mode:'cors'})
            const loadedData = await ALL_DATA.json();
            return PROCESS_ALL_DATA(loadedData); 
     
    }

    const PROCESS_ALL_DATA = (loadedData)=>{
        const location = loadedData.location;
        const current = loadedData.current;
        const forecast_day_0 = loadedData.forecast.forecastday[0];
        const forecast_day_1 = loadedData.forecast.forecastday[1].day;
        const forecast_day_2 = loadedData.forecast.forecastday[2].day;

        const data ={
            location:{
                name: location.name,
                country: location.country,
                local: location.localtime,
            },
            current:{
                temp_C:  current.temp_c,
                temp_F: current.temp_f,
                feelsLike_c: current.feelslike_c,
                feelsLike_f: current.feelslike_f,
                humidity: current.humidity,
                uv: current.uv,
                condition: current.condition.text
            },
            todayForecast:{
                sunrise: forecast_day_0.astro.sunrise,
                sunset: forecast_day_0.astro.sunset,
                daily_rain: forecast_day_0.day.daily_chance_of_rain,
                daily_snow: forecast_day_0.day.daily_chance_of_snow,
            },
            day1Forecast:{
                day1TempC: forecast_day_1.avgtemp_c,
                day1TempF: forecast_day_1.avgtemp_f,
                day1Rain:  forecast_day_1.daily_chance_of_rain
            },
            day2Forecast:{
                day2TempC: forecast_day_2.avgtemp_c,
                day2TempF: forecast_day_2.avgtemp_f,
                day2Rain:  forecast_day_2.daily_chance_of_rain
            }
        } 
    return data   
    }
    return {GET_ALL_DATA}
})();

export default weatherAPI;
