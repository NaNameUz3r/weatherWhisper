#!/usr/bin/env node

import { parseArgs } from './helpers/args.js';

const initCLI = () => {
    const cliArguments = parseArgs(process.argv);
    console.log(cliArguments);
};

initCLI();