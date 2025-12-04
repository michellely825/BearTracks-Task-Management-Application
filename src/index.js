let charIndex = 0;
const doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", doSomething);

function doSomething() {
  console.log("hi bitch");
}
const charImg = document.getElementById("character-img");
const rightArrow = document.getElementById("right-arrow");
rightArrow.addEventListener("click", nextCharacter);

function nextCharacter() {
  console.log("right click");
  if (charIndex == characters.length - 1) {
    charIndex = -1;
  }
  charImg.src = characters[(charIndex += 1)];
}

const leftArrow = document.getElementById("left-arrow");
leftArrow.addEventListener("click", prevCharacter);

function prevCharacter() {
  console.log("left click");
  if (charIndex == 0) {
    charIndex = characters.length;
  }
  charImg.src = characters[(charIndex -= 1)];
}

const characters = [
  "images/characters/bear12.png",
  "images/characters/bunny12.png",
  "images/characters/fox12.png",
  "images/characters/chickenwing12.png",
  "images/characters/lion12.png",
  "images/characters/panda12.png",
];
