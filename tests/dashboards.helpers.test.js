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

// describe("test countCompleted", () => {
//   test("count zero completed tasks", () => {
//     const taskArray = [];
//     const numCompletedElements = countCompleted(taskArray);
//     expect(numCompletedElements).toEqual(0);
//   });

//   test("count 2 out of 3 tasks completed", () => {
//     const taskArray = [
//       { taskContent: "eat", classList: ["todo-item", "completed"] },
//       { taskContent: "sleep", classList: ["todo-item", "completed"] },
//       { taskContent: "drink", classList: ["todo-item"] },
//     ];
//     const numCompletedElements = countCompleted(taskArray);
//     expect(numCompletedElements).toEqual(2);
//   });

//   test("display zero tasks are completed", () => {
//     updateCount();
//     expect(countSpan);
//   });

//   test("display non-zero count");

//   test("increment count after completing a task", () => {});

//   test("decrement count after deleting a task", () => {});

//   test("decrement count after unchecking a task", () => {});
// });
