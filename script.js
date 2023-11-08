"use strict";

const cols = document.querySelectorAll(".col");
const container = document.querySelector(".container");
const spaceEl = document.querySelector(".space-key");
const popup = document.querySelector(".popup");

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    coppiedPopup();
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
const setColors = function () {
  cols.forEach((col) => {
    if (col.children[1].classList.contains("fa-lock")) {
      return;
    }
    const hex = chroma.random();
    const [hEl, lock] = col.children;
    lock.style.color = hEl.style.color =
      chroma(hex).luminance() > 0.5 ? "black" : "white";
    const temp = hex;
    hEl.textContent = hex.hex().toUpperCase().slice(1);
    col.style.background = hex;
  });
};

const pressSpace = function (e) {
  if (e.code == "Space" || e.target.classList.contains("space-key")) {
    setColors();

    spaceEl.classList.add("pressed");

    setTimeout(() => {
      spaceEl.classList.remove("pressed");
    }, 100);
  }
};

container.addEventListener("click", function (e) {
  // Open or Lock mechanic
  if (e.target.classList.contains("fa-solid")) {
    e.target.classList.toggle("fa-lock-open");
    e.target.classList.toggle("fa-lock");
  } else if (e.target.classList.contains("hex-code")) {
    copyContent(e.target.textContent);
  }
});

document.body.onkeydown = function (e) {
  pressSpace(e);
};

spaceEl.addEventListener("click", function (e) {
  pressSpace(e);
});

setColors();

const coppiedPopup = function () {
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
};
