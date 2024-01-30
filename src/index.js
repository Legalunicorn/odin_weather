//import {weatherApp} from "./handler"

import weatherAPI from './api'

console.log('bye');
weatherAPI.GET_ALL_DATA("Singapore")
.then((response)=>{
    console.log('hi',response)
})
// console.log(beef)

// console.log(weatherAPI.GET_ALL_DATA('Singapore'))
// console.log(weatherAPI.data)
// weatherAPI.GET_ALL_DATA('singapore');
// console.log('hi')
// console.log(weatherAPI.data)




// console.log(getWeather())


// console.log('BRO')
// fetch(`https://api.weatherapi.com/v1/forecast.json?key=ec0903201e9b40878d632646242901&q=Singapore&days=3`)
//     .then(function(response){
//         return response.json()
//     })
//     .then((response)=>{
//         console.log('current json')
//         console.log(response)
//         console.log('focus')
//         console.log(response.forecast.forecastday[0].hour[13].chance_of_rain)
//     })
//     .catch((error)=>{
//         console.log('ERROR: ',error)
//     })
// import {format} from "date-fns";
// const today = new Date();
// const test = format(today,'yyyy/MM/dd')
// console.log('today',test)

// console.log('hi')
// fetch(`https://api.weatherapi.com/v1/future.json?key=ec0903201e9b40878d632646242901&q=singapore&dt=2024-02-22`)
//     .then(function (response) {
//         console.log('hm?')
//         return response.json()
//     })
//     .then((response) => {
//         console.log('forecast json')
//         console.log(response)
//     })
//     .catch((error) => {
//         console.log('ERROR: ', error)
//     })



