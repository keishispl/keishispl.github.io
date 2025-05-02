/**
 * Generates and appends social network links to the sns element.
 * Reads the sns links from a JSON file and creates corresponding HTML anchor elements.
 */
const snsListElement = document.getElementById("sns");

readSettingJSON("sns").forEach((sns) => {
     // Create an anchor element for the sns link
     const anchorElement = document.createElement("a");
     anchorElement.href = sns.link;
     anchorElement.target = "_blank";
     anchorElement.classList.add("btn");

     // Create an icon element for the sns link
     const iconElement = document.createElement("i");

     // Add appropriate classes based on the sns type
     if (sns.type === "fa") {
          iconElement.classList.add("fab", `fa-${sns.icon}`);
     } else if (sns.type === "ki") {
          iconElement.classList.add("kic", `ki-${sns.icon}`);
     }

     // Append the icon to the anchor element and the anchor element to the list
     anchorElement.appendChild(iconElement);
     snsListElement.appendChild(anchorElement);
});
