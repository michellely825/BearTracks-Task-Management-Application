export function updateAuthScreen(mode, loginScreen, signupScreen) {
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");
  if (mode === "login") {
    loginScreen.classList.remove("hidden");
  } else if (mode === "signup") {
    signupScreen.classList.remove("hidden");
  }
}

export function calculateNewIndex(currentIndex, direction, charactersLength) {
  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) {
    nextIndex = charactersLength - 1;
  } else if (nextIndex >= charactersLength) {
    nextIndex = 0;
  }
  return nextIndex;
}

export function createUserPayload(usernameInput, passwordInput) {
  return {
    username: usernameInput.trim(),
    password: passwordInput,
  };
}

export function displayAuthErrorMsg(mode, errorMsg) {
  mode.textContent = errorMsg;
  console.log(errorMsg);
  mode.classList.remove("hidden");
}

export function isPasswordValid(password) {
  // minimum length requirement
  if (password.length >= 5) return true;
  return false;
}
