// Variables
// let charImgIndex = 0;
const BACKEND_URL = "http://localhost:3000";
// let username;

// DOM Elements
const logInButton = document.getElementById("log-in-button");
const signUpButton = document.getElementById("sign-up-button");
// const nameSpan = document.getElementById("name-span");
// const doneButton = document.getElementById("done-button");
// const charImg = document.getElementById("character-img");
// const rightArrow = document.getElementById("right-arrow");
// const leftArrow = document.getElementById("left-arrow");
// const usernameInput = document.getElementById("name-input");

// Data
// const characters = [
//   "/src/images/characters/bear12.png",
//   "/src/images/characters/bunny12.png",
//   "/src/images/characters/fox12.png",
//   "/src/images/characters/chickenwing12.png",
//   "/src/images/characters/lion12.png",
//   "/src/images/characters/panda12.png",
// ];

// Event listeners
logInButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=login";
});
signUpButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=signup";
});
// leftArrow.addEventListener("click", prevCharacter);
// rightArrow.addEventListener("click", nextCharacter);
// usernameInput.addEventListener("input", updateWelcome);
// doneButton.addEventListener("click", beginProgram);

// Functions
function authenticateUser(mode) {}

// function nextCharacter() {
//   console.log("next clicked");
//   charImgIndex++;
//   if (charImgIndex >= characters.length) {
//     charImgIndex = 0;
//   }
//   charImg.src = characters[charImgIndex];
// }

// function prevCharacter() {
//   console.log("prev clicked");
//   charImgIndex--;
//   if (charImgIndex < 0) {
//     charImgIndex = characters.length - 1;
//   }
//   charImg.src = characters[charImgIndex];
// }

// function updateWelcome(e) {
//   // console.log(e.target.value);
//   if (usernameInput.value != "") {
//     nameSpan.textContent = ", " + e.target.value;
//   } else {
//     nameSpan.textContent = "";
//   }
// }

// function beginProgram() {
//   console.log("done button clicked");
//   const username = usernameInput.value;
//   if (username != "") {
//     const userData = {
//       username: username,
//       selectedCharacter: charImg.src,
//     };
//     fetch(`${BACKEND_URL}/users`, {
//       method: "POST",
//       headers: { "Content-Type": "applications/json" },
//       body: JSON.stringify(userData),
//     })
//       .then((response) => {
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("failed to create new user");
//         }
//         return response.json();
//       })
//       .then((data) => console.log("user created: ", data))
//       .catch((error) => console.log("error bitch ", error));
//     // window.location.href = `todo.html?`;
//     // return usernameInput.value;
//   }
// }

// module.exports = beginProgram;
