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
     waitFor("langFile", function () {
          var list = document.getElementById("minisite.list");

          list.innerHTML = "";

          readJSON("minisite").forEach(item => {
               var minisiteTextElement = document.createElement("p");
               minisiteTextElement.id = "minisite.text#" + item.id;
               minisiteTextElement.innerHTML = (langFile["minisite.text#"] === "" ? null : langFile["minisite.text#" + item.id]) ?? "???";
               list.appendChild(minisiteTextElement);

               var minisiteElement = document.createElement("a");
               minisiteElement.id = "minisite.btn#" + item.id;
               minisiteElement.classList.add("btn");
               minisiteElement.href = "../" + (item.link[lang] ?? item.link["default"]);
               minisiteElement.target = "_blank";
               minisiteElement.innerHTML = ((langFile["minisite.visit"] === "" ? null : langFile["minisite.visit"]) ?? "???") + ` <i class="fa-solid fa-up-right-from-square"></i>`;
               list.appendChild(minisiteElement);
          });
     });
}

minisiteWrite();