const snsListElement = document.getElementById("sns");

function readJSON(file) {
     const request = new XMLHttpRequest();
     request.open("GET", `data/${file}.json`, false);
     request.send(null);
     return JSON.parse(request.responseText);
}

var objects = [];

readJSON("sns").forEach((sns) => {
     var classList = "";
     if (sns.type === "fa") {
          classList = `fab fa-${sns.icon}`;
     } else if (sns.type === "ki") {
          classList = `kic ki-${sns.icon}`;
     }

     objects.push(
          <a href={sns.link} target="_blank">
               <i className={classList}></i>
          </a>
     );
});

ReactDOM.render(objects, snsListElement);