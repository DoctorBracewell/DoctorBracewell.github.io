import VanillaTilt from "vanilla-tilt";

VanillaTilt.init(Array.from(document.querySelectorAll(".image-tilt")), {
  reverse: true,
  max: 7,
  speed: 400,
  scale: 1.03,
  glare: true,
});
