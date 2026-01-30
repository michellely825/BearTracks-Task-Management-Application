// DOM Elements
const logInButton = document.getElementById("log-in-button");
const signUpButton = document.getElementById("sign-up-button");

// Event listeners
logInButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=login";
});
signUpButton.addEventListener("click", () => {
  window.location.href = "auth.html?mode=signup";
});
