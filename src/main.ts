import "./index.css";

import { tsParticles } from "tsparticles";

// Navigation hover update on red background
// window.addEventListener("scroll", () => {
//   const navbarLinks = document.querySelectorAll(".navbar-link");

//   if (window.scrollY >= document.documentElement.clientHeight) {
//     navbarLinks.forEach((element) =>
//       element.classList.add("navbar-link-hover-black")
//     );
//   } else {
//     navbarLinks.forEach((element) =>
//       element.classList.remove("navbar-link-hover-black")
//     );
//   }
// });

// Particles

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

window.addEventListener("resize", loadParticles);
loadParticles();
