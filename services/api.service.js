import { getKeyValue, TOKEN_STORAGE } from './storage.service.js';
import axios from 'axios';

const convertIcon = (icon) => {
    switch(icon) {
        case '01d': return '☀️';
        case '01n': return '🌙';
        case '02d': return '☁️';
        case '02n': return '☁️';
        case '03d': return '☁️';
        case '03n': return '☁️';
        case '04d': return '☁️';
        case '04n': return '☁️';
        case '09d': return '🌧️';
        case '09n': return '🌧️';
        case '10d': return '🌦️';
        case '10n': return '🌦️';
        case '11d': return '⛈️';
        case '11n': return '⛈️';
        case '13d': return '🌨️';
        case '13n': return '🌨️';
        default: return '?';
}
};

const getWeather = async () => {
    const token = await getKeyValue(TOKEN_STORAGE.token);
    const city = process.env.CITY ?? await getKeyValue(TOKEN_STORAGE.city)
    if (!token) {
        throw new Error('Empty API token loaded, set it with -t [API_KEY] command');
    }

    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
        q: city,
        appid: token,
        lang: 'en',
        units: 'metric'
        }
    });
    return data
};

export { getWeather, convertIcon };