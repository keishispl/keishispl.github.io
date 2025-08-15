function waitFor(variable, callback) {
     var interval = setInterval(function () {
          if (window[variable]) {
               clearInterval(interval);
               callback();
          }
     }, 200);
}

function readJSON(file) {
     const request = new XMLHttpRequest();
     request.open("GET", `data/${file}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

function linkWrite() {
     waitFor("langFile", function () {
          var list = document.querySelectorAll(".lsr") ?? [];

          readJSON("rinku").forEach((rinku) => {
               list.forEach((element) => {
                    if (element.id === rinku.id) {
                         element.id = rinku.id;
                         element.classList.add("btn");
                         element.href = rinku.link[lang] ?? rinku.link["default"];
                         element.innerHTML = (langFile[rinku.id] === "" ? null : langFile[rinku.id]) ?? "???";
                         if (rinku._blank) {
                              element.target = "_blank";
                              element.innerHTML += " <i class=\"fa-solid fa-up-right-from-square\"></i>";
                         }
                         return;
                    }
               })
          });
     });
}

linkWrite();