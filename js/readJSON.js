function readLangJSON(file) {
     var request = new XMLHttpRequest();
     request.open("GET", `../.lang/${file}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

function readSettingJSON(file) {
     var request = new XMLHttpRequest();
     request.open("GET", `../.settings/${file}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}