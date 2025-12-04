let charImgIndex = 0;

// DOM Elements
const doneButton = document.getElementById("done-button");
const charImg = document.getElementById("character-img");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
// Variables

// Data
const characters = [
  "images/characters/bear12.png",
  "images/characters/bunny12.png",
  "images/characters/fox12.png",
  "images/characters/chickenwing12.png",
  "images/characters/lion12.png",
  "images/characters/panda12.png",
];

// Event listeners
doneButton.addEventListener("click", doSomething);
leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);

// Functions
function doSomething() {
  console.log("hi bitch");
}

function nextCharacter() {
  charImgIndex++;
  if (charImgIndex >= characters.length) {
    charImgIndex = 0;
  }
  charImg.src = characters[charImgIndex];
}

function prevCharacter() {
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
}
