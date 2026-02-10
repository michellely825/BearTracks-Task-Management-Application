// const { response } = require("express");
import { updateAuthScreen } from "./auth.helpers.js";
const params = new URLSearchParams(window.location.search);

// Variables
const BACKEND_URL = "http://localhost:3000";
let charImgIndex = 0;
let charInput = "/src/images/characters/bear12.png";

const loginErrorMsg = document.querySelector("#login-error-msg");
const signupErrorMsg = document.querySelector("#signup-error-msg");
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

// Data
const characters = [
  "/src/images/characters/bear12.png",
  "/src/images/characters/bunny12.png",
  "/src/images/characters/fox12.png",
  "/src/images/characters/chickenwing12.png",
  "/src/images/characters/lion12.png",
  "/src/images/characters/panda12.png",
];

document.addEventListener("DOMContentLoaded", () => {
  const mode = params.get("mode");
  updateAuthScreen(mode, loginScreen, signupScreen);
});

// Event Listeners
// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const usernameInput = document.querySelector("#log-in-username").value.trim();
//   const passwordInput = document.querySelector("#log-in-password").value;
//   try {
//     loginErrorMsg.classList.add("hidden");
//     const response = await fetch(`${BACKEND_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: usernameInput,
//         password: passwordInput,
//       }),
//     });
//     const data = await response.json(); // data is the token
//     console.log("data send back from logins.js:::", data);
//     if (!response.ok) {
//       loginErrorMsg.textContent = data.error;
//       loginErrorMsg.classList.remove("hidden");
//       throw new Error(data.error);
//     }
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.user.username);
//     localStorage.setItem("characterImg", data.user.charInput);

//     window.location.href = "dashboard.html";
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// rewriting login form shiet
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
    if (!response.ok) {
      loginErrorMsg.textContent = data.error;
      loginErrorMsg.classList.remove("hidden");
      throw new Error(data.error);
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("characterImg", data.user.charInput);

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error.message);
  }
});

function createUserPayload(usernameInput, passwordInput) {
  return {
    username: usernameInput.trim(),
    password: passwordInput,
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
    console.log("data send back from users.js:::", data);

    if (!response.ok) {
      signupErrorMsg.textContent = data.error;
      signupErrorMsg.classList.remove("hidden");
      throw new Error(data.error); // stops execution and jumps to nearest catch block
    }
    // store token and username
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("characterImg", data.user.charInput);
    window.location.href = "dashboard.html";
  } catch (error) {
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

leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);

const updateModeInURL = (mode) => {
  const url = new URL(window.location); // get current URL
  url.searchParams.set("mode", mode); // update mode param
  history.replaceState(null, "", url); // replace current URL without reloading
};

// function updateMode(mode) {
//   if (mode === "login") {
//     loginScreen.classList.remove("hidden");
//     signupScreen.classList.add("hidden");
//   } else if (mode === "signup") {
//     loginScreen.classList.add("hidden");
//     signupScreen.classList.remove("hidden");
//   }
//   updateModeInURL(mode);
// }

// Sign Up Functions for Character Selection
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

function authenticateUser() {
  window.location.href = `dashboard.html?username=${data.username}`;
}
