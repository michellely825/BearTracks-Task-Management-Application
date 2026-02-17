// Import Helper Functions
import {
  updateAuthScreen,
  calculateNewIndex,
  createUserPayload,
  displayAuthErrorMsg,
} from "./auth.helpers.js";

// Variables
const params = new URLSearchParams(window.location.search);
const BACKEND_URL = "http://localhost:3000";
let currentIndex = 0;
let charInput = "/src/images/characters/bear12.png";

// Data
const characters = [
  "/src/images/characters/bear12.png",
  "/src/images/characters/bunny12.png",
  "/src/images/characters/fox12.png",
  "/src/images/characters/chickenwing12.png",
  "/src/images/characters/lion12.png",
  "/src/images/characters/panda12.png",
];

// DOM
const loginErrorMsg = document.querySelector("#login-error-msg");
const signupErrorMsg = document.querySelector("#signup-error-msg");
const loginScreen = document.getElementById("log-in");
const loginForm = document.querySelector("#log-in-form");
const toSignupButton = document.getElementById("switch-to-signup-button");
const signupScreen = document.getElementById("sign-up");
const signupForm = document.querySelector("#sign-up-form");
const toLoginButton = document.getElementById("switch-to-login-button");
const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");
const charImg = document.getElementById("character-img");

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const mode = params.get("mode");
  updateAuthScreen(mode, loginScreen, signupScreen);
});

leftArrow.addEventListener("click", () => changeCharacter(-1));
rightArrow.addEventListener("click", () => changeCharacter(1));

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = document.querySelector("#log-in-username").value;
  const passwordInput = document.querySelector("#log-in-password").value;
  const userPayload = createUserPayload(usernameInput, passwordInput);
  try {
    loginErrorMsg.classList.add("hidden");
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });
    const data = await response.json(); // data is the token
    const parsedData = parseServerResponse(response, data);
    logIn(parsedData); // updates localStorage and navigates
  } catch (error) {
    displayAuthErrorMsg(loginErrorMsg, error.message);
    console.error(error.message);
  }
});

function parseServerResponse(response, data) {
  if (!response.ok) {
    throw new Error(data.error);
  }
  return {
    token: data.token,
    username: data.user.username,
    characterImg: data.user.charInput,
  };
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usernameInput = document
    .getElementById("sign-up-username")
    .value.trim();
  const passwordInput = document.getElementById("sign-up-password").value;
  try {
    signupErrorMsg.classList.add("hidden");
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        charInput,
      }),
    });
    const data = await response.json();
    const parsedData = parseServerResponse(response, data);
    logIn(parsedData);
  } catch (error) {
    displayAuthErrorMsg(signupErrorMsg, error.message);
    console.error(error.message); // handles thrown errors
  }
});

toSignupButton.addEventListener("click", () => {
  updateAuthScreen("signup", loginScreen, signupScreen);
  console.log("here");
  updateModeInURL("signup");
});
toLoginButton.addEventListener("click", () => {
  updateAuthScreen("login", loginScreen, signupScreen);
  updateModeInURL("login");
});

// Functions
function logIn(parsedData) {
  localStorage.setItem("token", parsedData.token);
  localStorage.setItem("username", parsedData.username);
  localStorage.setItem("characterImg", parsedData.characterImg);
  window.location.href = "dashboard.html";
}

const updateModeInURL = (mode) => {
  const url = new URL(window.location); // get current URL
  url.searchParams.set("mode", mode); // update mode param
  history.replaceState(null, "", url); // replace current URL without reloading
};

function changeCharacter(direction) {
  const nextIndex = calculateNewIndex(
    currentIndex,
    direction,
    characters.length
  );
  charImg.src = characters[nextIndex];
  charInput = characters[nextIndex];
  currentIndex = nextIndex;
}
