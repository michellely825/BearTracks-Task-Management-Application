export function updateAuthScreen(mode, loginScreen, signupScreen) {
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");
  if (mode === "login") {
    loginScreen.classList.remove("hidden");
  } else if (mode === "signup") {
    signupScreen.classList.remove("hidden");
  }
}
