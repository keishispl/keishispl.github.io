/**
 * Handles language switching on the website.
 *
 * Reads the "lang" cookie to determine the user's preferred language, and
 * switches the language of the website accordingly. If the cookie is not set,
 * it defaults to the first language in the list.
 *
 * Also generates the language select element from the "lang" JSON file.
 */

const s = "_"

// Arrays to store language IDs, names, and titles
const languagesSF = []
const languagesNM = []
const languagesTITLE = []

// Read the "lang" JSON file and populate the arrays
readSettingJSON("lang").forEach((langu) => {
     languagesSF.push(langu.id)
     languagesNM.push(langu.name)
     languagesTITLE.push(langu.title)

     // Create an option element for the language select element
     var option = document.createElement('option')
     option.value = langu.id
     option.textContent = langu.name
     document.getElementById("lang-switch").appendChild(option)
})

// Get the language parameter from the URL, if it exists
const urlParams = new URLSearchParams(window.location.search)
if (languagesSF.includes(urlParams.get('lang'))) {
     // If the language parameter is valid, set the language cookie and remove the parameter from the URL
     var lang = urlParams.get('lang')
     history.pushState(null, "", location.href.split("?")[0]);

     document.cookie = `lang=${urlParams.get('lang')};`
} else {
     // If the language parameter is not valid, get the language from the cookie
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

/**
 * Switches the language of the website to the given language.
 *
 * @param {object} json - The language JSON object.
 */
function langFunction(json) {
     for (let key in json) {
          // If the JSON object has a translation for the given key, use it
          if (json[key].trim().length > 0) {
               document.getElementById(key).innerHTML = json[key];
          } else {
               // Otherwise, use the translation from the default language
               document.getElementById(key).innerHTML = readLangJSON(languagesSF[0])[key];
          }
     }
}

// Set the language select element to the user's preferred language
document.getElementById('lang-switch').selectedIndex = languagesSF.findIndex((obj) => obj === lang)

// Set the title of the page to the user's preferred language
document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === lang)]

// Add an event listener to the language select element
$('#lang-switch').change(function () {
     // Get the selected language from the select element
     var switchedLang = $(this).val();
     // Get the language JSON object for the selected language
     var json = readLangJSON(switchedLang);

     // Switch the language of the website
     langFunction(json);
     changeText(shown, json)
     // Set the language cookie
     document.cookie = `lang=${switchedLang};`
     // Set the title of the page to the selected language
     document.title = languagesTITLE[languagesSF.findIndex((obj) => obj === switchedLang)]
});
