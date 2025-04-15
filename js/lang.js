const s = "_"

const languagesSF = []
const languagesNM = []
const languagesTITLE = []
readSettingJSON("lang").forEach((langu) => {
     languagesSF.push(langu.id)
     languagesNM.push(langu.name)
     languagesTITLE.push(langu.title)

     var option = document.createElement('option')
     option.value = langu.id
     option.textContent = langu.name
     document.getElementById("lang-switch").appendChild(option)
})

const urlParams = new URLSearchParams(window.location.search)
if (languagesSF.includes(urlParams.get('lang'))) {
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
          return languagesSF[0];
     }

     var lang = getCookie("lang")
}

function langFunction(json) {
     for (let key in json) {
          if (json[key].trim().length > 0) {
               document.getElementById(key).innerHTML = json[key];
          } else {
               document.getElementById(key).innerHTML = readLangJSON(languagesSF[0])[key];
          }
     }
}

document.getElementById('lang-switch').selectedIndex = languagesSF.findIndex((obj) => obj === lang)
document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === lang)]

$('#lang-switch').change(function () {
     var switchedLang = $(this).val();
     var json = readLangJSON(switchedLang);

     langFunction(json);
     changeText(shown, json)
     document.cookie = `lang=${switchedLang};`
     lang = switchedLang;

     document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === lang)]
});