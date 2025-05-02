/**
 * Reads the "tabs" JSON file and generates tab elements for each tab.
 * Adds event listeners to handle tab visibility and language-specific text updates.
 */

// Read the "tabs" JSON file
const all = readSettingJSON("tabs");
const tablistElement = document.getElementById("tabslist");

// Create tab elements and append them to the tab list
all.forEach((tab) => {
     var tabElement = document.createElement("a");
     tabElement.id = "category_" + tab;
     tabElement.classList.add("btn", "long");
     tablistElement.appendChild(tabElement);
});

// Variable to track the currently shown tab
var shown = "";

/**
 * Updates the displayed text based on the provided string and language JSON.
 *
 * @param {string} string - The category string to update the text for.
 * @param {object} json - The language JSON object with text translations.
 */
function changeText(string, json) {
     for (const key in json) {
          if (key === `category_${string}` || (key === 'categori_home' && shown === "")) {
               const element = document.getElementById('categori_home');
               element.innerHTML = json[key].trim().length > 0 ? json[key] : readLangJSON(languagesSF[0])[key];
               return;
          }
     }
}

/**
 * Toggles the visibility of tab content and updates the shown tab.
 *
 * @param {string} string - The category string of the tab to toggle.
 */
function changeHold(string) {
     /**
      * Helper function to change the visibility and active state of a category.
      *
      * @param {string} type - "hide" or "show" to change the state.
      * @param {string} category - The category to change the state for.
      */
     function changeHoldClass(type, category) {
          const categoryDiv = document.getElementById(`category_${category}-div`);
          const categoryElement = document.getElementById(`category_${category}`);
          if (type === "hide") {
               categoryDiv.classList.add("is-hidden");
               categoryElement.classList.remove("is-active");
          } else if (type === "show") {
               categoryDiv.classList.remove("is-hidden");
               categoryElement.classList.add("is-active");
          }
     }

     all.forEach((key) => changeHoldClass("hide", key));
     if (shown !== string) {
          changeHoldClass("show", string);
          shown = string;
     } else {
          shown = "";
     }

     changeText(shown, readLangJSON(lang));
}

// Initialize tabs and add event listeners
all.forEach((key) => {
     const categoryDiv = document.getElementById(`category_${key}-div`);
     categoryDiv.classList.add("is-hidden");

     const categoryElement = document.getElementById(`category_${key}`);
     categoryElement.addEventListener('click', () => changeHold(key));
});
