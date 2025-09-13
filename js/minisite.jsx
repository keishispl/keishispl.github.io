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

function minisiteWrite() {
     waitFor("langFile", () => {
          var list = document.getElementById("minisite.list");
          var objects = [];

          readJSON("minisite").forEach(item => {
               var id = "minisite.list#" + item.id;
               var href = (item.link[lang] ?? item.link['default']);
               var minisiteTextElement = <p id={id}>{(langFile["minisite.text#"] === "" ? null : langFile["minisite.text#" + item.id]) ?? "???"}</p>;
               var minisiteElement = <a id={id} className="btn" href={href} target="_blank">{(langFile["minisite.visit"] === "" ? null : langFile["minisite.visit"]) ?? "???"} <i className="fa-solid fa-up-right-from-square"></i></a>;
               objects.push(minisiteTextElement, minisiteElement);
          });

          ReactDOM.render(objects, list);
     });
}

minisiteWrite();