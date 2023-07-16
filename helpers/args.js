const parseArgs = (args) => {
    const parsedArguments = {};
    const [executer, file, ...rest] = args;
    rest.forEach((element, index, arr) => {
       if(element.charAt(0) == '-') {
            if (index == arr.length - 1) {
                parsedArguments[element.substring(1)] = true;
            } else if (arr[index + 1].charAt(0) != '-') {
                parsedArguments[element.substring(1)] = arr[index + 1];
            } else {
                parsedArguments[element.substring(1)] = true;
            }
       }
    });
    return parsedArguments;
};


export { parseArgs }