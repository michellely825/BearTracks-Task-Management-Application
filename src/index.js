// Variables
let charImgIndex = 0;
let username;

// DOM Elements
// const welcomeText = document.getElementById("welcome-text");
const nameSpan = document.getElementById("name-span");
const doneButton = document.getElementById("done-button");
const charImg = document.getElementById("character-img");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const usernameInput = document.getElementById("name-input");

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
usernameInput.addEventListener("input", updateWelcome);

// Functions
function beginProgram() {
  if (usernameInput.value != "") {
    username = usernameInput.value;
    window.location.href = `todo.html?name=${encodeURIComponent(
      username
    )}&char=${encodeURIComponent(charImgIndex)}}`;
  }
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

function updateWelcome(e) {
  console.log(e.target.value);
  if (usernameInput.value != "" && nameSpan.textContent == "") {
    nameSpan.textContent += " ";
  } else if (usernameInput.value == "") {
    console.log("empty");
    nameSpan.textContent = nameSpan.textContent.replace(" ", "");
  }
  // nameSpan.textContent + e.target.value;
}
