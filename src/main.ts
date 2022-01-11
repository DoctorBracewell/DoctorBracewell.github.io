import "./index.css";

import { tsParticles } from "tsparticles";

import Splide from "@splidejs/splide";
import "../node_modules/@splidejs/splide/dist/css/splide-core.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// Splide Scroller
const splide = new Splide(".splide", {
  width: "100%",
  type: "loop",
  pauseOnHover: false,
  pauseOnFocus: false,
  arrows: false,
  fixedHeight: "8em",
  fixedWidth: "8em",
  gap: "5em",
  padding: 0,
  autoScroll: {
    speed: 2,
    pauseOnHover: false,
    pauseOnFocus: false,
  },
});

splide.mount({ AutoScroll });

// Navigation hover update on red background
window.addEventListener("scroll", () => {
  const navbarLinks = document.querySelectorAll(".navbar-link");

  if (window.scrollY >= document.documentElement.clientHeight) {
    navbarLinks.forEach((element) =>
      element.classList.add("navbar-link-hover-black")
    );
  } else {
    navbarLinks.forEach((element) =>
      element.classList.remove("navbar-link-hover-black")
    );
  }
});

// Particles
window.addEventListener("resize", loadParticles);

function loadParticles() {
  const SCREEN_AVERAGE = (window.innerHeight + window.innerWidth) / 2;

  tsParticles.load("particles-container", {
    fullScreen: {
      enable: true,
    },
    background: {
      color: "#090a0b",
    },
    fpsLimit: 60,
    particles: {
      links: {
        color: {
          value: "#FAF0F0",
        },
        distance: SCREEN_AVERAGE / 10,
        enable: true,
        opacity: 0.4,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        speed: 1,
      },
      opacity: {
        value: 0.9,
      },
      number: {
        value: SCREEN_AVERAGE / 15,
      },
      size: {
        value: 0,
      },
    },
  });
}

loadParticles();
