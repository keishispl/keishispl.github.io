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
                    var request = new XMLHttpRequest();
                    request.open("GET", `../lang/${languagesSF[0]}.json`, false);
                    request.send(null)
                    document.getElementById(`categori_home`).innerHTML = JSON.parse(request.responseText)[key];
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

     var request = new XMLHttpRequest();
     request.open("GET", `../lang/${lang}.json`, false);
     request.send(null);
     changeText(shown, JSON.parse(request.responseText));
}

for (const key of all) {
     document.getElementById(`category_${key}-div`).classList.add("is-hidden");
     var request = new XMLHttpRequest();
     request.open("GET", `../lang/${lang}.json`, false);
     request.send(null);
     changeText(`${key}`, JSON.parse(request.responseText));
     document.getElementById(`category_${key}`).addEventListener('click', () => {
          changeHold(`${key}`);
     });
};