const { createUserPayload } = require("../src/auth");

test("trims username correctly", () => {
  expect(createUserPayload("  michy   ", "nut")).toEqual({
    username: "michy",
    password: "nut",
  });
});
