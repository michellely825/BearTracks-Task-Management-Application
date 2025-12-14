const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

// Variables
const BACKEND_URL = "http://localhost:3000";
let charImgIndex = 0;

// General DOM
const loginScreen = document.getElementById("log-in");
const signupScreen = document.getElementById("sign-up");

// Log in DOM
const loginButton = document.getElementById("login-in-button");
const toSignupButton = document.getElementById("switch-to-signup-button");
const loginForm = document.querySelector("#log-in-form");
// const loginUsername = document.getElementById("log-in-username");
// const loginPassword = document.getElementById("log-in-password");

// Sign up DOM
const signupButton = document.getElementById("sign-up-button");
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

if (mode === "login") {
  signupScreen.classList.add("hidden");
} else if (mode === "signup") {
  loginScreen.classList.add("hidden");
}

// Log in Event Listeners
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#log-in-username").value.trim();
  const password = document.querySelector("#log-in-password").value;

  // console.log(username, password);

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
    console.error("ERROR BITCH: ", error);
  }
});
// loginButton.addEventListener("click", authenticateUser);
toSignupButton.addEventListener("click", () => {
  signupScreen.classList.remove("hidden");
  loginScreen.classList.add("hidden");
});

// Sign up Event Listeners
// signupButton.addEventListener("click", authenticateUser);
toLoginButton.addEventListener("click", () => {
  signupScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});
leftArrow.addEventListener("click", prevCharacter);
rightArrow.addEventListener("click", nextCharacter);

// General Functions

// async function authenticateUser() {
//   try {
//     const response = await fetch(`${BACKEND_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "applications/json" },
//       body: JSON.stringify({
//         username: loginUsername.value,
//         password: loginPassword.value,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("new error bitch");
//     }
//     const data = await response.json();
//     console.log("log in success here is the data in json: ", data);
//   } catch (error) {
//     console.error("ERROR BITCH ", error);
//   }
// }

// Sign up Functions
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
