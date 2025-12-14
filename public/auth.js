let charImgIndex = 0;

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

const logInScreen = document.getElementById("log-in");
const signUpScreen = document.getElementById("sign-up");
const toLoginButton = document.getElementById("switch-to-login-button");
const toSignupButton = document.getElementById("switch-to-signup-button");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const charImg = document.getElementById("character-img");

const characters = [
  "/src/images/characters/bear12.png",
  "/src/images/characters/bunny12.png",
  "/src/images/characters/fox12.png",
  "/src/images/characters/chickenwing12.png",
  "/src/images/characters/lion12.png",
  "/src/images/characters/panda12.png",
];

if (mode === "login") {
  signUpScreen.classList.add("hidden");
} else if (mode === "signup") {
  logInScreen.classList.add("hidden");
}

toLoginButton.addEventListener("click", () => {
  signUpScreen.classList.add("hidden");
  logInScreen.classList.remove("hidden");
});
toSignupButton.addEventListener("click", () => {
  signUpScreen.classList.remove("hidden");
  logInScreen.classList.add("hidden");
});

leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);

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
