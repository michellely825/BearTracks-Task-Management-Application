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
  mode.classList.remove("hidden");
}

export function isPasswordValid(password) {
  // password must meet min length and contain an uppercase, lowercase, and a digit
  const digits = /d/;
  const uppercase = /[A-Z]/;
  const minimumLength = 5;

  if (
    password.length >= minimumLength &&
    uppercase.test(password) &&
    // digits.test(password)
    // digits.test(password)
  ) {
    return true;
  }

  return false;
}
