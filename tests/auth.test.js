const { createUserPayload } = require("../src/auth");

test("trims username correctly", () => {
  expect(createUserPayload("  michy   ", "nut")).toEqual({
    username: "michy",
    password: "nut",
  });
});

// test which auth screen displays

// test("wraps around backwards", () => {
//   expect(getNextCharIndex(0, -1, 5)).toBe(4);
// });

// test("wraps around forwards", () => {
//   expect(getNextCharIndex(4, 1, 5)).toBe(0);
// });

// test("increments normally", () => {
//   expect(getNextCharIndex(2, 1, 5)).toBe(3);
// });
