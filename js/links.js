readSettingJSON("links").forEach((link) => {
     if (document.getElementById('website_group-'+link.group) === null) {
          var group = document.createElement("div");
          group.id = 'website_group-' + link.group;
          group.classList.add("buttons");
          document.getElementById("category_website-div").appendChild(group);
     } else {
          var group = document.getElementById('website_group-' + link.group)
     }

     var linkElement = document.createElement("a");
     linkElement.href = link.link;
     linkElement.id = "link_"+link.id;
     linkElement.target = "_blank";
     linkElement.classList.add("btn");

     if (link.long === true) {
          linkElement.classList.add("long2");

     } else {
          linkElement.classList.add("long");
     }

     group.appendChild(linkElement);
})