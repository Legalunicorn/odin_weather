import { addDays, format, getDay } from 'date-fns';
import weatherAPI from './api'
import dom from './dom'


const handler = (() => {
    // const unitSetting = 'C'; //default value
    // const citySetting = 'london'
    // const citySetting ='london'
    // let currentJSON;
    // weatherAPI.GET_ALL_DATA(citySetting).then()

    function onLoad(CS, US) {
        initSearchBar();
        initUnit();
        getData(CS, US);
    }
    function initUnit() {
        const unitButton = document.querySelector('[data-toggle]')

        unitButton.addEventListener('click', () => {
            let newUnit;
            let unitSetting = unitButton.dataset.toggle
            const currentLocation = document.getElementById('citycountry').dataset.lastSearch
            if (unitSetting == 'C') {
                unitSetting = 'F'
                unitButton.classList.remove('to-cel')
                unitButton.classList.add('to-fa')
                unitButton.dataset.toggle = 'F'
                newUnit = 'F'
                //toggle class list here
            }
            else {
                unitSetting = 'C'
                unitButton.classList.remove('to-fa')
                unitButton.classList.add('to-cel')
                unitButton.dataset.toggle = 'C'
                newUnit = 'C'
            }
            getData(currentLocation, newUnit)
            toggleUnits(newUnit)
        })
    }

    function toggleUnits(newUnit) {
        let textUnit;
        if (newUnit == "C") {
            textUnit = '℃'
        }
        else {
            textUnit = '℉'
        }
        dom.toggleUnit(textUnit);

    }
    function initSearchBar() {
        const searchBar = document.getElementById('search-bar');

        //everything below this is fired when there is a search
        searchBar.addEventListener('search', () => {
            const inputCity = searchBar.value;
            const unitSetting = document.querySelector('[data-toggle]').dataset.toggle
            getData(inputCity, unitSetting); //will call process data
            //retrives information using API
        })
    }

    function getData(city, unit) {
        weatherAPI.GET_ALL_DATA(city).then((response) => {
            console.log(response)
            processData(response, unit)
        }).catch((response) => {
            runSearchError(response);
        })
    }
    function processData(data, unit) {
        //L,C,d1,d2,TF
        // dom.updateBox1(data.location
        processLocation(data);
        processCurrent(data, unit);
        processTodayForecast(data, unit);
        processFutureForecast(data, unit);

    }
    //BOX 1 - 5 
    function processLocation(data) { //unit unit dependent
        const location = data.location;


        //const for arguments
        const locationTitle = `${location.name}, ${location.country}`;
        const locName = location.name

        const today = location.local;
        const dateZero = format(new Date(today), 'M/dd')
        const dayZero = format(today, 'EEE')


        const tmr = new Date(addDays(today, 1))
        const dateOne = format(tmr, 'M/dd')
        const dayOne = format(tmr, 'EEE')

        const overmorrow = new Date(addDays(tmr, 1))
        const dateTwo = format(overmorrow, 'M/dd')
        const dayTwo = format(overmorrow, 'ccc')
        //call DOM 
        dom.updateLocation(locName, locationTitle, dateZero, dayZero,
            dateOne, dayOne, dateTwo, dayTwo)
    }
    function processCurrent(data, unit) {
        const current = data.current;

        const condition = current.condition;
        const humidity = current.humidity;
        const uv = current.uv;
        let feelsLike, temp;
        if (unit == 'C') {
            feelsLike = current.feelsLike_c
            temp = current.temp_C
        }
        else {
            feelsLike = current.feelsLike_f
            temp = current.temp_F
        }
        dom.updateCurrent(condition, humidity, feelsLike, temp, uv)

    }
    function processTodayForecast(data) {
        const todayForecast = data.todayForecast
        const daily_rain = todayForecast.daily_rain;
        const daily_snow = todayForecast.daily_snow;
        const sunrise = todayForecast.sunrise;
        const sunset = todayForecast.sunset;

        dom.updateTodayForecast(daily_rain, daily_snow, sunrise, sunset)

    }
    function processFutureForecast(data, unit) {
        const dayOne = data.day1Forecast;
        const dayTwo = data.day2Forecast;

        const dayOneRain = dayOne.day1Rain;
        const dayTwoRain = dayTwo.day2Rain;

        let tempOne, tempTwo;
        if (unit == "C") {
            tempOne = dayOne.day1TempC
            tempTwo = dayTwo.day2TempC
        }
        else {
            tempOne = dayOne.day1TempF
            tempTwo = dayTwo.day2TempF
        }
        dom.updateFutureForecast(dayOneRain, tempOne, dayTwoRain, tempTwo)

    }

    function runSearchError(reponse) {
        console.log('error!!!!', reponse)
    }

    return { onLoad }
})();

export default handler;


