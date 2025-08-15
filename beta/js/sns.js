const snsListElement = document.getElementById("sns");

function readJSON(file) {
     const request = new XMLHttpRequest();
     request.open("GET", `data/${file}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

readJSON("sns").forEach((sns) => {
     const anchorElement = document.createElement("a");
     anchorElement.href = sns.link;
     anchorElement.target = "_blank";

     const iconElement = document.createElement("i");

     if (sns.type === "fa") {
          iconElement.classList.add("fab", `fa-${sns.icon}`);
     } else if (sns.type === "ki") {
          iconElement.classList.add("kic", `ki-${sns.icon}`);
     }

     anchorElement.appendChild(iconElement);
     snsListElement.appendChild(anchorElement);
});
