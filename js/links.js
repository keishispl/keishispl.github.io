/**
 * Reads the links from the JSON file and generates HTML elements for them.
 *
 * Links are created as anchor elements with the class "btn" and an ID of "link_<linkId>".
 * Each link is appended to a group div with an ID of "website_group-<groupId>".
 * If the group div does not exist, it is created and appended to the "category_website-div".
 *
 * @param {String} filename The filename of the JSON file containing the links.
 */
function generateLinks(filename) {
     // Read link data from the specified JSON file
     const linkData = readSettingJSON(filename);

     // Iterate through each link in the data
     linkData.forEach((link) => {
          // Get the group element where the link should be appended
          let groupElement = document.getElementById(`website_group-${link.group}`);

          // If the group element does not exist, create it
          if (groupElement === null) {
               groupElement = document.createElement("div");
               groupElement.id = `website_group-${link.group}`;
               groupElement.classList.add("buttons");
               document.getElementById("category_website-div").appendChild(groupElement);
          }

          // Create the anchor element for the link
          const anchorElement = document.createElement("a");
          anchorElement.href = link.link;
          anchorElement.id = `link_${link.id}`;
          anchorElement.target = "_blank";
          anchorElement.classList.add("btn", link.long ? "long2" : "long");

          // Append the anchor element to the group element
          groupElement.appendChild(anchorElement);
     });
}

// Generate links using the "links" JSON file
generateLinks("links");
