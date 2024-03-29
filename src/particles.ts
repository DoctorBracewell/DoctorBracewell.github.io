import { tsParticles } from "tsparticles";

// Set up TS particles
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

// Resize event on window to update the amount of particles
window.addEventListener("resize", loadParticles);

// Initial particle load
loadParticles();
