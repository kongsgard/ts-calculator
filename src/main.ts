import { getMessage } from "./delaunay.js";

// 1. Select the div element using the id property
const app = document.getElementById("app");
// 2. Create a new <p></p> element programmatically
const p = document.createElement("p");
// 3. Add the text content
p.textContent = getMessage();
// 4. Append the p element to the div element
app?.appendChild(p);
