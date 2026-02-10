export function updateAuthScreen(mode, loginScreen, signupScreen) {
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");
  if (mode === "login") {
    loginScreen.classList.remove("hidden");
  } else if (mode === "signup") {
    signupScreen.classList.remove("hidden");
  }
}

export function nextCharacter() {
  charImgIndex++;
  if (charImgIndex >= characters.length) {
    charImgIndex = 0;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
}

export function prevCharacter() {
  charImgIndex--;
  if (charImgIndex < 0) {
    charImgIndex = characters.length - 1;
  }
  charImg.src = characters[charImgIndex];
  charInput = characters[charImgIndex];
}
