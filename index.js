const s = "_";
const languages = [
     `ja${s}日本語${s}圭紫のカード`,
     `en${s}English${s}Keishi's Card`,
     `zh-td${s}繁體中文${s}Kacey的網站`,
     `zh-hk${s}廣東話${s}Kacey嘅網頁`
];

const languagesSF = [];
const languagesNM = [];
const languagesTITLE = [];

const langSwitch = document.getElementById("lang-switch");

// Populate language data and dropdown
languages.forEach(langStr => {
     const [code, name, title] = langStr.split(s);
     languagesSF.push(code);
     languagesNM.push(name);
     languagesTITLE.push(title);

     const option = document.createElement("option");
     option.value = code;
     option.textContent = name;
     langSwitch.appendChild(option);
});

// Determine language from URL or cookie
const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang');

if (languagesSF.includes(lang)) {
     document.cookie = `lang=${lang};`;
     history.replaceState(null, "", location.pathname);
} else {
     lang = getCookie("lang") || languagesSF[0];
}

// Get cookie value
function getCookie(name) {
     return document.cookie
          .split('; ')
          .find(row => row.startsWith(`${name}=`))
          ?.split('=')[1] || null;
}

// Load language JSON synchronously
function loadLangData(languageCode) {
     const request = new XMLHttpRequest();
     request.open("GET", `../lang/${languageCode}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

// Apply translated strings to DOM
function applyTranslations(json) {
     for (const key in json) {
          const el = document.getElementById(key);
          if (!el) continue;

          const value = json[key].trim();
          if (value) {
               el.innerHTML = value;
          } else {
               const fallback = loadLangData(languagesSF[0]);
               el.innerHTML = fallback[key] || "";
          }
     }
}

// Initial language load and DOM updates
$('[lang]').hide();
$(`[lang="${lang}"]`).show();

const initialJson = loadLangData(lang);
applyTranslations(initialJson);

langSwitch.selectedIndex = languagesSF.indexOf(lang);
document.title = languagesTITLE[languagesSF.indexOf(lang)];

// Handle language switch
$('#lang-switch').change(function () {
     const selectedLang = this.value;
     const json = loadLangData(selectedLang);

     applyTranslations(json);
     changeText(shown, json);

     document.cookie = `lang=${selectedLang};`;
     lang = selectedLang;

     document.title = languagesTITLE[languagesSF.indexOf(lang)];
});




// Category behavior
const categories = ["intro", "social", "website"];
let shown = "";

// Update category label
function changeText(categoryKey, json) {
     const textKey = shown === "" && categoryKey === "home"
          ? "categori_home"
          : `category_${categoryKey}`;

     const content = json[textKey]?.trim();
     const target = document.getElementById("categori_home");

     if (content) {
          target.textContent = content;
     } else {
          const fallback = loadLangData(languagesSF[0]);
          target.textContent = fallback[textKey] || "";
     }
}

// Toggle category display
function changeHold(categoryKey) {
     const json = loadLangData(lang);

     categories.forEach(cat => {
          document.getElementById(`category_${cat}-div`).classList.add("is-hidden");
          document.getElementById(`category_${cat}`).classList.remove("is-active");
     });

     if (shown !== categoryKey) {
          document.getElementById(`category_${categoryKey}-div`).classList.remove("is-hidden");
          document.getElementById(`category_${categoryKey}`).classList.add("is-active");
          shown = categoryKey;
     } else {
          shown = "";
     }

     changeText(shown, json);
}

// Initial category setup
categories.forEach(categoryKey => {
     const div = document.getElementById(`category_${categoryKey}-div`);
     const btn = document.getElementById(`category_${categoryKey}`);

     div.classList.add("is-hidden");
     changeText(categoryKey, initialJson);
     btn.addEventListener('click', () => changeHold(categoryKey));
});
