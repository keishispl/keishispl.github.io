const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('lang') === "ja" || urlParams.get('lang') === "en") {
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
          return "ja";
     }

     var lang = getCookie("lang")
}


function langFunction(json) {
     for (let key in json) {
          document.getElementById(key).innerHTML = json[key];
     }
}

$('[lang]').hide();
$(`[lang="${lang}"]`).show();

var request = new XMLHttpRequest();
request.open("GET", `../lang/${lang}.json`, false);
request.send(null)
langFunction(JSON.parse(request.responseText));

if (lang == "ja") document.getElementById('lang-switch').selectedIndex = 0;
if (lang == "en") document.getElementById('lang-switch').selectedIndex = 1;

$('#lang-switch').change(function () {
     var request = new XMLHttpRequest();
     request.open("GET", "../lang/ja.json", false);
     request.send(null)
     var jsonJA = JSON.parse(request.responseText);

     var request = new XMLHttpRequest();
     request.open("GET", "../lang/en.json", false);
     request.send(null)
     var jsonEN = JSON.parse(request.responseText);

     var lang2 = $(this).val();
     switch (lang2) {
          case 'ja':
               langFunction(jsonJA);
               changeText(shown)
               document.cookie = "lang=ja;"
               lang = "ja"
               break;
          case 'en':
               langFunction(jsonEN);
               changeText(shown)
               document.cookie = "lang=en;"
               lang = "en"
               break;
          default:
               window.location = "./"
     }
});