const snslistElement = document.getElementById("sns");
readSettingJSON("sns").forEach((sns) => {
     var snsElement = document.createElement("a");
     snsElement.href = sns.link;
     snsElement.target = "_blank";
     snsElement.classList.add("btn");

     var iconElement = document.createElement("i");
     if (sns.type === "fa") {
          iconElement.classList.add("fab");
          iconElement.classList.add("fa-"+sns.icon);
     }
     if (sns.type === "ki") {
          iconElement.classList.add("kic");
          iconElement.classList.add("ki-" + sns.icon);
     }

     snslistElement.appendChild(snsElement);
     snsElement.appendChild(iconElement);
})