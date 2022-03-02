import VanillaTilt from "vanilla-tilt";

VanillaTilt.init(
  [...(document.querySelectorAll(".image-tilt") as NodeListOf<HTMLElement>)],
  {
    reverse: true,
    max: 7,
    speed: 400,
    scale: 1.03,
    glare: true,
  }
);
