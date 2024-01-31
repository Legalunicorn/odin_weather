

const dom = (() => {
    function updateLocation(locName, locationTitle, dateZero, dayZero,
        dateOne, dayOne, dateTwo, dayTwo) {

        document.getElementById('citycountry').textContent = locationTitle;
        document.getElementById('citycountry').dataset.lastSearch = locName;

        document.querySelector('[data-day="0"]').textContent = dayZero;
        document.querySelector('[data-date="0"]').textContent = dateZero;

        document.querySelector('[data-day="1"]').textContent = dayOne;
        document.querySelector('[data-date="1"] ').textContent = dateOne;

        document.querySelector('[data-day="2"]').textContent = dayTwo;
        document.querySelector('[data-date="2"]').textContent = dateTwo;
    }

    function updateCurrent(condition, humidity, feelslike, temp, uv) {
        document.getElementById('condition').textContent = condition;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('feels-like-num').textContent = feelslike;

        document.getElementById('temp-num').textContent = temp;
        //forecast
        document.querySelector('[data-n-day-temp="0"]').textContent = temp;
        document.getElementById('uv').textContent = uv


    }
    function updateTodayForecast(rain, snow, sunrise, sunset) {
        document.getElementById('today-chance-of-rain').textContent = rain+ '%';
        document.querySelector('[data-n-day-rain="0"]').textContent = rain + '%';

        document.getElementById('today-chance-of-snow').textContent = snow + '%';
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
    }
    function updateFutureForecast(dayOneRain, tempOne, dayTwoRain, tempTwo) {
        document.querySelector('[data-n-day-temp="1"]').textContent = tempOne;
        document.querySelector('[data-n-day-rain="1"]').textContent = dayOneRain  + '%';
        document.querySelector('[data-n-day-temp="2"]').textContent = tempTwo;
        document.querySelector('[data-n-day-rain="2"]').textContent = dayTwoRain  + '%';

    }
    function toggleUnit(newUnit) {
        const units = document.querySelectorAll('[data-deg]')
        units.forEach((unit)=>{
            unit.textContent=newUnit;
        })
    }


    return { updateLocation, updateCurrent, updateTodayForecast, updateFutureForecast, toggleUnit }
})();

export default dom