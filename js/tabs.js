const all = [
     "intro",
     "social",
     "website"
];
shown = "";

function changeText(string, json) {
     for (key in json) {
          if (key === `category_${string}` || (key === 'categori_home' && shown === "")) {
               if (json[key].trim().length > 0) {
                    document.getElementById(`categori_home`).innerHTML = json[key];
               } else {
                    document.getElementById(`categori_home`).innerHTML = readLangJSON(languagesSF[0])[key];
               }
               return;
          }
     }
}
function changeHold(string) {
     if (shown !== string) {
          for (const key of all) {
               document.getElementById(`category_${key}-div`).classList.add("is-hidden");
               document.getElementById(`category_${key}`).classList.remove("is-active");
          }

          document.getElementById(`category_${string}-div`).classList.remove("is-hidden");
          document.getElementById(`category_${string}`).classList.add("is-active");

          shown = string;
     } else {
          for (const key of all) {
               document.getElementById(`category_${key}-div`).classList.add("is-hidden");
               document.getElementById(`category_${key}`).classList.remove("is-active");
          }
          shown = "";
     }

     changeText(shown, readLangJSON(lang));
}

for (const key of all) {
     document.getElementById(`category_${key}-div`).classList.add("is-hidden");
     changeText(`${key}`, readLangJSON(lang));
     document.getElementById(`category_${key}`).addEventListener('click', () => {
          changeHold(`${key}`);
     });
};