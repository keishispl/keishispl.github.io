const all = [
     "intro",
     "social",
     "website"
];
shown = "";

function changeText(string) {
     if (lang === 'ja') {
          var request = new XMLHttpRequest();
          request.open("GET", "../lang/ja.json", false);
          request.send(null)
          var json = JSON.parse(request.responseText);
     } else if (lang === 'en') {
          var request = new XMLHttpRequest();
          request.open("GET", "../lang/en.json", false);
          request.send(null)
          var json = JSON.parse(request.responseText);
     }
     for (key in json) {
          if (key === `category_${string}`) {
               document.getElementById(`location`).innerHTML = json[key];
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
     changeText(string);
}

for (const key of all) {
     document.getElementById(`category_${key}-div`).classList.add("is-hidden");
     changeText(`${key}`);
     document.getElementById(`category_${key}`).addEventListener('click', () => {
          changeHold(`${key}`);
     });
};