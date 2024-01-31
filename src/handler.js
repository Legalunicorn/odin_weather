import {addDays,format,getDay} from 'date-fns';
import weatherAPI from './api'
import dom from './dom'


const handler =(()=>{
    // const unitSetting = 'C'; //default value
    // const citySetting = 'london'
    // const citySetting ='london'
    // let currentJSON;
    // weatherAPI.GET_ALL_DATA(citySetting).then()
    
    function onLoad(CS,US){
        initSearchBar();
        initUnit();
        getData(CS,US);
    }
    function initUnit(){
        const unitButton = document.querySelector('[data-toggle]')
        console.log('unit btn is: ',unitButton)

        unitButton.addEventListener('click',()=>{
            let newUnit;
            let unitSetting = unitButton.dataset.toggle
            const currentLocation = document.getElementById('citycountry').dataset.lastSearch
            if (unitSetting=='C'){
                unitSetting='F'
                unitButton.classList.remove('to-cel')
                unitButton.classList.add('to-fa')
                unitButton.dataset.toggle='F'
                newUnit = 'F'
                //toggle class list here
            }
            else{
                unitSetting='C'
                unitButton.classList.remove('to-fa')
                unitButton.classList.add('to-cel')
                unitButton.dataset.toggle='C'
                newUnit = 'C'
            }
            console.log('THE UNIT SETTING IS ',newUnit)
            console.log(currentLocation,newUnit)
            toggleUnits(newUnit)
            getData(currentLocation,newUnit)
        })
    }

    function toggleUnits(newUnit){
        let textUnit;
        if (newUnit=="C"){
            textUnit = '℃'
        }
        else{
            textUnit='℉'
        }
        dom.toggleUnit(textUnit);

    }
    function initSearchBar(){
        const searchBar = document.getElementById('search-bar');
        console.log('pass')

        //everything below this is fired when there is a search
        searchBar.addEventListener('search',()=>{
            const inputCity = searchBar.value;
            const unitSetting = document.querySelector('[data-toggle]').dataset.toggle
            getData(inputCity,unitSetting); //will call process data
                //retrives information using API
        })
    }

    function getData(city,unit){
        weatherAPI.GET_ALL_DATA(city).then((response)=>{
            console.log(response)
            processData(response,unit)
        }).catch((response)=>{
            runSearchError(response);
        })
    }
    function processData(data,unit){
        //L,C,d1,d2,TF
        // dom.updateBox1(data.location
        processLocation(data);
        processCurrent(data,unit);
        processTodayForecast(data,unit);
        processFutureForecast(data,unit);

    }
    //BOX 1 - 5 
    function processLocation(data){ //unit unit dependent
        //helper const to reduce repeat
        const location = data.location; 
        const today = location.local;
        console.log()
        console.log('its today!',today)

        //const for arguments
        const locationTitle = `${location.name}, ${location.country}`;
        const locName = location.name

        const dateZero = format(new Date(today),'M/dd')
        const dayZero = format(getDay(today),'E')
        console.log(today,'   dayZero ISSS',dayZero)
        console.log();


        const tmr = addDays(new Date(today),1)
        console.log(tmr)
        const dateOne = format(tmr,'M/dd')
        const dayOne = format(getDay(tmr),'E')
        console.log('day one ISSS, ',dayOne)

        const overmorrow = addDays(new Date(tmr),1)
        const dateTwo = format(overmorrow,'M/dd')
        const dayTwo = format(getDay(overmorrow),'E')
        console.log('#3 ',overmorrow,dayTwo)

        //call DOM 
        dom.updateLocation(locName,locationTitle,dateZero,dayZero,
            dateOne,dayOne,dateTwo,dayTwo)
    }
    function processCurrent(data,unit){
        console.log('current,unit is',unit)
        const current = data.current;

        const condition = current.condition;
        const humidity = current.humidity;
        const uv = current.uv;
        let feelsLike,temp;
        if (unit=='C'){
            feelsLike = current.feelsLike_c
            temp = current.temp_C
            console.log('getting C,',temp)
        }
        else{
            feelsLike = current.feelsLike_f
            temp = current.temp_F
            console.log('getting F,',temp)
        }
        dom.updateCurrent(condition,humidity,feelsLike,temp,uv)

    }
    function processTodayForecast(data){
        const todayForecast = data.todayForecast
        const daily_rain = todayForecast.daily_rain;
        const daily_snow = todayForecast.daily_snow;
        const sunrise = todayForecast.sunrise;
        const sunset = todayForecast.sunset;
        console.log('the daily rain is...',daily_rain)

        dom.updateTodayForecast(daily_rain,daily_snow,sunrise,sunset)

    }
    function processFutureForecast(data,unit){
        const dayOne = data.day1Forecast;
        const dayTwo = data.day2Forecast;

        const dayOneRain = dayOne.day1Rain;
        const dayTwoRain = dayTwo.day2Rain;

        let tempOne,tempTwo;
        if (unit=="C"){
            tempOne = dayOne.day1TempC
            tempTwo = dayTwo.day2TempC
        }
        else{
            tempOne = dayOne.day1TempF
            tempTwo = dayTwo.day2TempF
        }
        dom.updateFutureForecast(dayOneRain,tempOne,dayTwoRain,tempTwo)

    }

    function runSearchError(reponse){
        console.log('error!!!!',reponse)
        //loadError message + log(error) in console for debugging 
    }

    return {onLoad}
})();

export default handler;


