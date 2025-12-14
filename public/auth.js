// const { response } = require("express");
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

// Variables
const BACKEND_URL = "http://localhost:3000";
let charImgIndex = 0;

// Log In DOM
const loginScreen = document.getElementById("log-in");
const loginForm = document.querySelector("#log-in-form");
const toSignupButton = document.getElementById("switch-to-signup-button");

// Sign In DOM
const signupScreen = document.getElementById("sign-up");
const signupForm = document.querySelector("#sign-up-form");
const toLoginButton = document.getElementById("switch-to-login-button");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const charImg = document.getElementById("character-img");
// const charInput = document.getElementById("character-input");

// Data
const characters = [
  "/src/images/characters/bear12.png",
  "/src/images/characters/bunny12.png",
  "/src/images/characters/fox12.png",
  "/src/images/characters/chickenwing12.png",
  "/src/images/characters/lion12.png",
  "/src/images/characters/panda12.png",
];

if (mode === "login") {
  signupScreen.classList.add("hidden");
} else if (mode === "signup") {
  loginScreen.classList.add("hidden");
}

// Event Listeners
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#log-in-username").value.trim();
  const password = document.querySelector("#log-in-password").value;

  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("new error binch");
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error("Error logging in...", error);
  }
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("sign-up-username").value.trim();
  const password = document.getElementById("sign-up-password").value;
  // const charInput = document.getElementById("character-input").value;

  try {
    await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, charInput }),
    });
    if (!response.ok) {
      throw new Error("new error signing in");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error signing in...", error);
  }
});

toSignupButton.addEventListener("click", () => updateMode("signup"));
toLoginButton.addEventListener("click", () => updateMode("login"));

leftArrow.addEventListener("click", () => {
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
});
rightArrow.addEventListener("click", () => {
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
  console.log(charInput);
});

const updateModeInURL = (mode) => {
  const url = new URL(window.location); // get current URL
  url.searchParams.set("mode", mode); // update mode param
  history.replaceState(null, "", url); // replace current URL without reloading
};

function updateMode(mode) {
  if (mode === "login") {
    loginScreen.classList.remove("hidden");
    signupScreen.classList.add("hidden");
  } else if (mode === "signup") {
    loginScreen.classList.add("hidden");
    signupScreen.classList.remove("hidden");
  }
  updateModeInURL(mode);
}

function nextCharacter() {
  console.log("next clicked");
  charImgIndex++;
  if (charImgIndex >= characters.length) {
    charImgIndex = 0;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
}

function prevCharacter() {
  console.log("prev clicked");
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
}

function updateCharacter() {
  //   characterImage.src = characters[currentIndex];
  //   characterInput.value = characters[currentIndex]; // this ensures the selected character is submitted
}
