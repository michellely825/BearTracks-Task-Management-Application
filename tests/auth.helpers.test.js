const { sign } = require("jsonwebtoken");
const {
  createUserPayload,
  calculateNewIndex,
  updateAuthScreen,
} = require("../src/auth.helpers");

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
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="log-in"></div>
    <div id="sign-up"></div>`;
  });

  test("display login screen", () => {
    const loginScreen = document.querySelector("#log-in");
    const signupScreen = document.querySelector("#sign-up");
    updateAuthScreen("login", loginScreen, signupScreen);
    expect(loginScreen.classList.contains("hidden")).toBe(false);
    expect(signupScreen.classList.contains("hidden")).toBe(true);
  });

  test("display signup screen", () => {
    const loginScreen = document.querySelector("#log-in");
    const signupScreen = document.querySelector("#sign-up");
    updateAuthScreen("signup", loginScreen, signupScreen);
    expect(signupScreen.classList.contains("hidden")).toBe(false);
    expect(loginScreen.classList.contains("hidden")).toBe(true);
  });
});
