#!/usr/bin/env node

import { parseArgs } from './helpers/args.js';
import { getWeather, convertIcon } from './services/api.service.js';
import { printHelp, printOk, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_STORAGE } from './services/storage.service.js';

const initCLI = async () => {
    const cliArguments = parseArgs(process.argv);
    if (cliArguments.h) {
        printHelp();
    }
    if (cliArguments.s) {
        await saveCity(cliArguments.s)
        process.exit(0)
    }
    if (cliArguments.t) {
        await saveToken(cliArguments.t)
        process.exit(0)
    }

    getForecast();
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("No city passed")
        return;
    }
    try {
        await saveKeyValue(TOKEN_STORAGE.city, city);
        printOk(`City set to ${city}`);
    } catch(e) {
        printError(e.message);
        }
};

const saveToken = async (token) => {
    if (!token.length) {
        printError("No token passed")
        return;
    }
    try {
        await saveKeyValue(TOKEN_STORAGE.token, token);
        printOk("Token saved!");
    } catch(e) {
        printError(e.message);
        }
};

const getForecast = async () => {
    try {
      const weather = await getWeather();
      const icon = convertIcon(weather.weather[0].icon)
      if(weather) {
        printWeather(weather, icon)
      } else {
        printError('Weather data not found');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        printError('Wrong city');
      } else if (err.response?.status === 401) {
        printError('Invalid token');
      } else {
        printError(err.message);
      }
    }
};


initCLI();