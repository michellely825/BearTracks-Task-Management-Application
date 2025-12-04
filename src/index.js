// Variables
let charImgIndex = 0;
let username;

// DOM Elements
const doneButton = document.getElementById("done-button");
const charImg = document.getElementById("character-img");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const usernameInput = document.getElementById("name");

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
doneButton.addEventListener("click", beginProgram);
leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);

// Functions
function beginProgram() {
  username = usernameInput.value;
  window.location.href = `todo.html?name=${encodeURIComponent(
    username
  )}&char=${encodeURIComponent(charImgIndex)}}`;
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
