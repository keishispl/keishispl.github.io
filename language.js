const s = "_"

const languages = [
     `ja${s}日本語${s}圭紫のカード`,
     `en${s}English${s}Keishi's Card`,
     `zh-td${s}繁體中文${s}Kacey的網站`,
     `zh-hk${s}廣東話${s}Kacey嘅網頁`
]

const languagesSF = []
const languagesNM = []
const languagesTITLE = []
for (let i = 0; i < languages.length; i++) {
     languagesSF.push(languages[i].split(s)[0])
     languagesNM.push(languages[i].split(s)[1].split(s)[0])
     languagesTITLE.push(languages[i].split(s)[2])

     var option = document.createElement('option')
     option.value = languages[i].split(s)[0]
     option.innerHTML = languages[i].split(s)[1].split(s)[0]
     document.getElementById("lang-switch").appendChild(option)
}

const urlParams = new URLSearchParams(window.location.search)
if (languagesSF.includes(urlParams.get('lang'))) {
     var lang = urlParams.get('lang')
     document.cookie = `lang=${urlParams.get('lang')};`
     history.pushState(null, "", location.href.split("?")[0]);
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
               var request = new XMLHttpRequest();
               request.open("GET", `../lang/${languagesSF[0]}.json`, false);
               request.send(null)
               document.getElementById(key).innerHTML = JSON.parse(request.responseText)[key];
          }
     }
}

$('[lang]').hide();
$(`[lang="${lang}"]`).show();

var request = new XMLHttpRequest();
request.open("GET", `../lang/${lang}.json`, false);
request.send(null)
langFunction(JSON.parse(request.responseText));

document.getElementById('lang-switch').selectedIndex = languagesSF.findIndex((obj) => obj === lang)
document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === lang)]

$('#lang-switch').change(function () {
     var switchedLang = $(this).val();
     var request = new XMLHttpRequest();
     request.open("GET", `../lang/${switchedLang}.json`, false);
     request.send(null)
     var json = JSON.parse(request.responseText);

     langFunction(json);
     changeText(shown, json)
     document.cookie = `lang=${switchedLang};`
     lang = switchedLang;

     document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === lang)]
});