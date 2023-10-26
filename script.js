"use strict";

const cols = document.querySelectorAll(".col");
const container = document.querySelector(".container");

container.addEventListener("click", function (e) {
  // Open or Lock mechanic
  if (e.target.classList.contains("fa-solid")) {
    e.target.classList.toggle("fa-lock-open");
    e.target.classList.toggle("fa-lock");
  } else if (e.target.classList.contains("hex-code")) {
    copyContent(e.target.textContent);
  }
});

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error("Failed to copy: ", e);
  }
};

// Manually create random colors:
// const createRandomColor = function () {
//   const domain = "0123456789ABCFED";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += domain[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };
chroma.random();
const setColors = function () {
  cols.forEach((col) => {
    if (col.children[1].classList.contains("fa-lock")) {
      return;
    }
    const hex = chroma.random();
    const [hEl, lock] = col.children;
    hEl.style.color = chroma(hex).luminance() > 0.5 ? "black" : "white";
    lock.style.color = chroma(hex).luminance() > 0.5 ? "black" : "white";
    hEl.textContent = hex;
    col.style.background = hex;
  });
};

setColors();

document.body.onkeydown = function (e) {
  if (e.code == "Space") {
    setColors();

    const spaceKeyDiv = document.querySelector(".space-key");
    spaceKeyDiv.classList.add("pressed");

    setTimeout(() => {
      spaceKeyDiv.classList.remove("pressed");
    }, 100);
  }
};
