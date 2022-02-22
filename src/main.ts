import "./styles/index.css";

import "./navbarLinks";
import "./particles";
import "./imageTilts";

// Polyfill smooth scrolling
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

document.querySelector(
  "#copyright"
).textContent = `© ${new Date().getFullYear()} DrBracewell`;
