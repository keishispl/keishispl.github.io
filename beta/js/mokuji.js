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

function mokujiWrite() {
     waitFor("langFile", function () {
          var list = document.getElementById("mokuji.list");

          list.innerHTML = "";

          readJSON("mokuji").forEach(id => {
               var mokujiElement = document.createElement("a");
               mokujiElement.id = "mokuji.list#" + id;
               mokujiElement.classList.add("btn");
               mokujiElement.innerHTML = (langFile["mokuji.list#" + id] === "" ? null : langFile["mokuji.list#" + id]) ?? "???";
               list.appendChild(mokujiElement);
               mokujiElement.addEventListener('click', () => {
                    try {
                         document.getElementById("div#" + id).scrollIntoView({ behavior: "smooth" });
                    } catch (e) { };
               });
          });
     });
}

mokujiWrite();