// Clipboard Copying
const timeouts = [];
const tag = document.querySelector("#copy-tag");

tag.addEventListener("click", () => {
  // Reset timeouts
  for (const timeout of timeouts) {
    clearTimeout(timeout);
  }

  // Copy to clipboard
  navigator.clipboard.writeText(tag.textContent);

  // Reset animation
  document.documentElement.style.setProperty("--copy-transition", "left");
  document.documentElement.style.setProperty("--copy-left", "0px");
  document.documentElement.style.setProperty("--copy-visibility", "0");

  // trigger animation
  document.documentElement.style.setProperty("--copy-visibility", "100");
  document.documentElement.style.setProperty("--copy-left", "15px");

  // Set timeouts
  timeouts.push(
    setTimeout(() => {
      document.documentElement.style.setProperty("--copy-transition", "all");
      document.documentElement.style.setProperty("--copy-visibility", "0");

      timeouts.push(
        setTimeout(() => {
          document.documentElement.style.setProperty("--copy-left", "0px");
        }, 500)
      );
    }, 2000)
  );
});
