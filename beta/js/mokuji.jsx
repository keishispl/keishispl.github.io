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
          var objects = [];

          readJSON("mokuji").forEach(id => {
               function click() {
                    try {
                         document.getElementById("div#" + id).scrollIntoView({ behavior: "smooth" });
                    } catch (e) { };
               }
               var mokujiElement = <a onClick={click} id={"mokuji.list#" + id} className="btn">{(langFile["mokuji.list#" + id] === "" ? null : langFile["mokuji.list#" + id]) ?? "???"}</a>
               objects.push(mokujiElement);
          });

          ReactDOM.render(objects, list);
     });
}

mokujiWrite();