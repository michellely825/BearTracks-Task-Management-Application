// Variables
const BACKEND_URL = "http://localhost:3000";

// DOM Elements
const logInButton = document.getElementById("log-in-button");
const signUpButton = document.getElementById("sign-up-button");
// const nameSpan = document.getElementById("name-span");
// const doneButton = document.getElementById("done-button");
// const usernameInput = document.getElementById("name-input");

// Event listeners
logInButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=login";
});
signUpButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=signup";
});
// usernameInput.addEventListener("input", updateWelcome);
// doneButton.addEventListener("click", beginProgram);

// Functions
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
