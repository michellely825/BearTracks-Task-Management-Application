const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

const logInScreen = document.getElementById("log-in");
const signUpScreen = document.getElementById("sign-up");
const toLoginButton = document.getElementById("switch-to-login-button");
const toSignupButton = document.getElementById("switch-to-signup-button");

if (mode === "login") {
  signUpScreen.classList.add("hidden");
} else if (mode === "signup") {
  logInScreen.classList.add("hidden");
}

toLoginButton.addEventListener("click", () => {
  //   window.location.href = "/auth.html?mode=login";
  //   logInScreen.classList.remove("hidden");
  //   signUpScreen.classList.add("hidden");
});
toSignupButton.addEventListener("click", () => {
  //   window.location.href = "/auth.html?mode=signup";
  //   logInScreen.classList.add("hidden");
  //   signUpScreen.classList.remove("hidden");
});
