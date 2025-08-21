const langList = {
     ja: "日本語",
     en: "English",
     zh: "繁體中文"
};

/**
 * Current language of the website
 * @type {string}
 */
var lang;

const urlParams = new URLSearchParams(window.location.search)
if (Object.keys(langList).includes(urlParams.get('lang'))) {
     var lang = urlParams.get('lang')
     history.pushState(null, "", location.href.split("?")[0]);

     document.cookie = `lang=${urlParams.get('lang')};`
} else {
     function getCookie(cname) {
          let name = cname + "=";
          let decodedCookie = decodeURIComponent(document.cookie);
          let ca = decodedCookie.split(';');
          for (let i = 0; i < ca.length; i++) {
               let c = ca[i];
               while (c.charAt(0) == ' ') {
                    c = c.substring(1);
               }
               if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
               }
          }
          return null;
     }

     var lang = getCookie("lang");

     if (lang === null) {
          for (var i = 0; i < Object.keys(langList).length; i++) {
               if (navigator.language.startsWith(Object.keys(langList)[i])) {
                    lang = Object.keys(langList)[i];
                    break;
               }
          }

          if (lang === null) {
               lang = Object.keys(langList)[0];
          }
     }
}

function readLangFile(lang) {
     const request = new XMLHttpRequest();
     request.open("GET", `data/lang/${lang}.yml`, false);
     request.send(null);
     var response = `${request.responseText}`;

     var yaml = {};

     response.split("\n").forEach((line) => {
          if (line === "") return;
          if (line.startsWith("#")) return;

          var key = line.split(": ")[0];
          var value = line.split(": ")[1].replaceAll(";", ":");
          yaml[key] = value === "null" ? " " : value;
     });

     return yaml;
}

function langSwitchText(lang) {
     document.title = lang["setting.title"];
     document.querySelectorAll(".ls").forEach((element) => {
          element.innerHTML = (lang[element.id] === "" ? null : lang[element.id]) ?? "???";
     });
}

var langFile = readLangFile(lang);

for (var i = 0; i < Object.keys(langList).length; i++) {
     var option = document.createElement('option');
     option.value = Object.keys(langList)[i];
     option.textContent = langList[Object.keys(langList)[i]];
     document.getElementById("lang-switch").appendChild(option);
}

document.getElementById("lang-switch").value = lang;

document.getElementById("lang-switch").addEventListener('change', () => {
     lang = document.getElementById("lang-switch").value;
     langFile = readLangFile(lang);
     langSwitchText(langFile);
     linkWrite();
     mokujiWrite();
     minisiteWrite();
     document.cookie = `lang=${lang};`;
});

langSwitchText(langFile);