import { DateTime } from "luxon";

const API_KEY = "92dbfa46673bbb4e70f238b0d606371c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url).then((res) => res.json())
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon },
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data;

    const {main: details, icon} = weather[0]

    return { lat, lon, temp, feels_like, temp_min, temp_max,
    humidity, name, dt, country, sunrise, sunset, details, icon, speed,
}
}


const formatForecastWeather = (data) => {
    const { timezone, list } = data; // `list` contains 3-hour intervals for 5 days

    // Group 3-hour forecasts into daily forecasts
    const dailyForecasts = {};
    list.forEach(item => {
        const date = formatToLocalTime(item.dt, timezone, 'yyyy-MM-dd');
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                title: formatToLocalTime(item.dt, timezone, 'ccc'),
                temp: item.main.temp,
                icon: item.weather[0].icon,
            };
        }
    });

    // Convert to array and slice for next 5 days
    const daily = Object.values(dailyForecasts).slice(1, 6);

    // Get hourly forecasts (next 5 entries, 3-hour intervals)
    const hourly = list.slice(1, 6).map(item => ({
        title: formatToLocalTime(item.dt, timezone, 'hh:mm a'),
        temp: item.main.temp,
        icon: item.weather[0].icon,
    }));

    return { timezone, daily, hourly };
};



const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const {lat, lon} =  formattedCurrentWeather;

     const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: "metric",
    }).then(formatForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
