import {
  updateAuthScreen,
  calculateNewIndex,
  createUserPayload,
  displayAuthErrorMsg,
} from "../src/auth.helpers.js";

test("trims username correctly", () => {
  expect(createUserPayload("  michy   ", "nut")).toEqual({
    username: "michy",
    password: "nut",
  });
});

describe("test calculateNewIndex function", () => {
  test("increments character index", () => {
    expect(calculateNewIndex(0, 1, 5)).toBe(1);
  });

  test("decrements character index", () => {
    expect(calculateNewIndex(1, -1, 5)).toBe(0);
  });

  test("wraps around forwards", () => {
    expect(calculateNewIndex(5, 1, 5)).toBe(0);
  });

  test("wraps around backwards", () => {
    expect(calculateNewIndex(0, -1, 5)).toBe(4);
  });
});

describe("test updateAuthScreen function", () => {
  let loginScreen;
  let signupScreen;

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="log-in"></div>
    <div id="sign-up"></div>`;
    loginScreen = document.querySelector("#log-in");
    signupScreen = document.querySelector("#sign-up");
  });

  test("display login screen", () => {
    updateAuthScreen("login", loginScreen, signupScreen);
    expect(loginScreen.classList.contains("hidden")).toBe(false);
    expect(signupScreen.classList.contains("hidden")).toBe(true);
  });

  test("display signup screen", () => {
    updateAuthScreen("signup", loginScreen, signupScreen);
    expect(signupScreen.classList.contains("hidden")).toBe(false);
    expect(loginScreen.classList.contains("hidden")).toBe(true);
  });
});

describe("test displayAuthErrorMsg function", () => {
  let signupErrorMsg;
  let loginErrorMsg;

  beforeEach(() => {
    document.body.innerHTML = `
    <h4 class="error-msg hidden" id="signup-error-msg"></h4>
    <h4 class="error-msg hidden" id="login-error-msg"></h4>
    `;
    signupErrorMsg = document.querySelector("#signup-error-msg");
    loginErrorMsg = document.querySelector("#login-error-msg");
  });

  test("display login form validation error message", () => {
    displayAuthErrorMsg(
      loginErrorMsg,
      "Sorry, we couldn't find an account with that username. Please try again."
    );
    expect(signupErrorMsg.classList.contains("hidden")).toBe(true);
    expect(loginErrorMsg.classList.contains("hidden")).toBe(false);
    expect(loginErrorMsg.textContent).toEqual(
      "Sorry, we couldn't find an account with that username. Please try again."
    );
  });

  test("display signup form validation error message", () => {
    displayAuthErrorMsg(
      signupErrorMsg,
      "Username already taken. Please try a different one."
    );
    expect(signupErrorMsg.classList.contains("hidden")).toBe(false);
    expect(loginErrorMsg.classList.contains("hidden")).toBe(true);
    expect(signupErrorMsg.textContent).toEqual(
      "Username already taken. Please try a different one."
    );
  });
});
