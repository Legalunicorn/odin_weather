
 data;
async function getWeather(city){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ec0903201e9b40878d632646242901&q=singapore}`,
    {
        mode:'cors'
    })
    const tf = await response.json();
    return tf;

}
export {getWeather};