/**
 * Reads a JSON file from the lang folder and returns the parsed data.
 * @param {string} filename - The name of the JSON file to read.
 * @returns {object} The parsed JSON data.
 */
function readLangJSON(filename) {
     const request = new XMLHttpRequest();
     request.open("GET", `../lang/${filename}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

/**
 * Reads a JSON file from the settings folder and returns the parsed data.
 * @param {string} filename - The name of the JSON file to read.
 * @returns {object} The parsed JSON data.
 */
function readSettingJSON(filename) {
     const request = new XMLHttpRequest();
     request.open("GET", `../settings/${filename}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

/**
 * Calls the langFunction function after a short delay to allow the JSON files to load.
 * @param {function} langFunction - The function to call after the delay.
 */
setTimeout(() => {
     langFunction(readLangJSON(lang));
}, 200);
