import { captureTask, clearTaskInput } from "../src/dashboard.helpers.js";

describe("test captureTask", () => {
  test("return null for empty string inputs", () => {
    expect(captureTask("")).toBe(null);
  });

  test("return string value for non-empty inputs", () => {
    expect(captureTask("eat")).toEqual("eat");
  });
});

describe("test clearTaskInput", () => {
  let taskInput;
  beforeEach(() => {
    document.body.innerHTML = `
        <input id="task-input" type="text" placeholder="Add your task..." />
        `;
    taskInput = document.getElementById("task-input");
  });

  test("clear non-empty task input field", () => {
    taskInput.value = "eat";
    clearTaskInput(taskInput);
    expect(taskInput.value).toBe("");
  });
});
