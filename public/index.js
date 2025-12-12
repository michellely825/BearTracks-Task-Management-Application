// Variables
let charImgIndex = 0;
// let username;

// DOM Elements
const nameSpan = document.getElementById("name-span");
const doneButton = document.getElementById("done-button");
const charImg = document.getElementById("character-img");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const usernameInput = document.getElementById("name-input");

// Data
const characters = [
  "/src/images/characters/bear12.png",
  "/src/images/characters/bunny12.png",
  "/src/images/characters/fox12.png",
  "/src/images/characters/chickenwing12.png",
  "/src/images/characters/lion12.png",
  "/src/images/characters/panda12.png",
];

// Event listeners
leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);
usernameInput.addEventListener("input", updateWelcome);
doneButton.addEventListener("click", beginProgram);

// Functions
function nextCharacter() {
  console.log("next clicked");
  charImgIndex++;
  if (charImgIndex >= characters.length) {
    charImgIndex = 0;
  }
  charImg.src = characters[charImgIndex];
}

function prevCharacter() {
  console.log("prev clicked");
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
}

function updateWelcome(e) {
  console.log(e.target.value);
  if (usernameInput.value != "") {
    nameSpan.textContent = ", " + e.target.value;
  } else {
    nameSpan.textContent = "";
  }
}

function beginProgram() {
  if (usernameInput.value != "") {
    const username = usernameInput.value;
    window.location.href = `todo.html?`;
    // return usernameInput.value;
  }
}

// module.exports = beginProgram;
