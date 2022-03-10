import { scrollIntoView } from "seamless-scroll-polyfill";
import debounce from "lodash/debounce";

// Check if one (fixed) element is inside another in the viewport.
function elementInsideBox(element1: Element, element2: Element) {
  const [box1, box2] = [element1, element2].map((element) =>
    element.getBoundingClientRect()
  );

  return box1.y + box1.height >= box2.y;
}

// Debounced function to update the colours of navbar links depending if the navbar is inside a box with a red background or not.
function updateHoverColours() {
  const navbar = document.querySelector("nav");
  const redBackgrounds = [...document.querySelectorAll(".red-background")];
  const navbarLinks = [...document.querySelectorAll(".navbar-link")];

  for (const box of redBackgrounds) {
    const isInsideBox = elementInsideBox(navbar, box);

    for (const link of navbarLinks) {
      if (isInsideBox) link.classList.add("navbar-link-hover-black");
      if (!isInsideBox) link.classList.remove("navbar-link-hover-black");
    }
  }
}

// Use lodash's debounce function to update hover colours when the user stops scrolling
window.addEventListener(
  "scroll",
  debounce(updateHoverColours, 100, {
    trailing: true,
  })
);

// Set up smooth scrolling for navbar links
for (const link of [...document.querySelectorAll(".link")]) {
  link.addEventListener("click", () =>
    // polyfill for webkit/safari
    scrollIntoView(
      document.querySelector("#" + (link as HTMLElement).dataset.section),
      {
        block: "start",
        behavior: "smooth",
      }
    )
  );
}
