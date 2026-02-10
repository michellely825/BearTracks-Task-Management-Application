function updateAuthScreen(mode, loginScreen, signupScreen) {
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");
  if (mode === "login") {
    signupScreen.classList.remove("hidden");
  } else if (mode === "signup") {
    loginScreen.classList.remove("hidden");
  }
}

module.exports = { updateAuthScreen };
