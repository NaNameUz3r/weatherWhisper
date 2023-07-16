import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) =>  {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
};

const printOk = (error) =>  {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + error)
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without flags — it just prints weather
        -s [CITY] sets city to fetch weather for
        -h for help
        -t [API_KEY] sets open weather api token.
        `
    )
};

const printWeather = (weather, icon) => {
    console.log(
        dedent`${chalk.blueBright(' WEATHER ')}
        Weather in the city ${weather.name}:
        ${icon} ${weather.weather[0].description}
        Temperature: ${weather.main.temp}, Feels like: ${weather.main.feels_like}
        Humidity: ${weather.main.humidity}%
        Wind-Speed: ${weather.wind.speed} m/s
        `
    )

}

export {printError, printOk, printHelp, printWeather}
