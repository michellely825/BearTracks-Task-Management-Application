//TODO: do refresh token?
//TODO: reward system?
// TODO:test coverage for server requests

// Imports
import { captureTask, clearTaskInput } from "./dashboard.helpers.js";

// Variables
const BACKEND_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const character = localStorage.getItem("characterImg");

// DOM
const signOutButton = document.getElementById("sign-out-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const incompleteTaskList = document.getElementById("incomplete-task-list");
const completedTaskList = document.getElementById("completed-task-list");
const nameSpan = document.getElementById("username-span");
const countSpan = document.getElementById("complete-tasks-count-span");
const characterImg = document.getElementById("user-profile-img");

// Event Listeners
signOutButton.addEventListener("click", () => {
  window.location.href = `index.html`;
});
addButton.addEventListener("click", addTask);
document.addEventListener("click", updateTaskStatus);
document.addEventListener("DOMContentLoaded", async () => {
  if (!token) return; // not logged in
  try {
    const response = await fetch(`${BACKEND_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json(); // converts JSON to JS object
    if (!response.ok) {
      throw new Error(data.error);
    }
    personalizeUI();

    for (const todo of data.todos) {
      addTaskToDOM(todo);
    }
    updateCount();
  } catch (error) {
    console.error(error.message);
  }
});

// Functions
function updateCount() {
  const numCompletedElements = countCompleted(
    Array.from(document.querySelectorAll(".todo-item"))
  );
  countSpan.textContent = numCompletedElements;
}

function countCompleted(array) {
  const numCompletedElements = array.filter((element) =>
    element.classList.contains("completed")
  ).length;
  return numCompletedElements;
}

async function addTask() {
  const rawValue = taskInput.value;

  const task = captureTask(rawValue);
  if (!task) return; // stop if input is empty

  clearTaskInput(taskInput);

  const savedTask = await sendTaskToServer(task);
  if (!savedTask) return; // stop if server fails and returns null

  addTaskToDOM(savedTask);
}

// adds task to DB
async function sendTaskToServer(task) {
  try {
    const response = await fetch(`${BACKEND_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task }), // converts task obj to JSON string
    });
    const data = await response.json(); // converts JSON to JS object
    if (!response.ok) {
      throw new Error(data.error);
    } else {
      console.log("dashboard.js - data received from server: ", data);
      return data;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// updates UI
function addTaskToDOM(taskObj) {
  const { completed: taskCompleted, _id: taskID, task: taskContent } = taskObj; // grabs completed and renames it to taskCompleted etc...
  const task = createTask(taskID, taskContent); // task is a list item here
  const checkbox = task.querySelector("input[type='checkbox']");
  if (taskCompleted === false) {
    checkbox.checked = false;
    task.classList.remove("completed");
    incompleteTaskList.append(task);
  } else if (taskCompleted === true) {
    checkbox.checked = true;
    task.classList.add("completed");
    completedTaskList.append(task);
  }
}

function createTask(taskID, taskValue) {
  const task = document.createElement("li");
  task.className = "todo-item";
  task.id = taskID;

  const tInput = document.createElement("input");
  tInput.type = "checkbox";

  const tSpan = document.createElement("span");
  tSpan.className = "todo-text";
  tSpan.textContent = taskValue;

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "task-buttons-div";

  const delButton = document.createElement("button");
  delButton.id = "delete-button";
  const delImg = document.createElement("img");
  delImg.src = "/src/images/buttons/del (1).png";
  delImg.id = "del-img";
  delButton.append(delImg);
  delButton.addEventListener("click", deleteTask);

  const editButton = document.createElement("button");
  editButton.id = "edit-button";
  const editImg = document.createElement("img");
  editImg.src = "/src/images/buttons/edit1smaller.png";
  editImg.id = "edit-img";
  editButton.append(editImg);
  editButton.addEventListener("click", updateTaskContent);

  buttonDiv.append(editButton, delButton);
  task.append(tInput, tSpan, buttonDiv);

  return task;
}

async function deleteTask(e) {
  const task = e.target.closest("li");
  try {
    const response = await fetch(`${BACKEND_URL}/todos/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.error);
    }
    task.remove();
    updateCount();
  } catch (error) {
    console.error(error.message);
  }
}

// TODO: update to PATCH?
function updateTaskContent(e) {
  const task = e.target.closest("li");
  const tSpan = task.querySelector("span");
  tSpan.contentEditable = "true";
  document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedContent = tSpan.textContent;
      try {
        const response = await fetch(`${BACKEND_URL}/todos/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ task: updatedContent }),
        });
        const data = await response.json();
        console.log("data from todos.js:", data);
        if (!response.ok) {
          throw new Error(data.error);
        }
        console.log("successfully updated task content!");
        tSpan.textContent = updatedContent;
        tSpan.contentEditable = "false";
      } catch (error) {
        console.log(error);
        console.error(error.message);
      }
    }
  });
  tSpan.focus();
}

async function updateTaskStatus(e) {
  if (e.target.type == "checkbox") {
    const task = e.target.parentElement;
    console.log(e.target.checked);
    try {
      const response = await fetch(`${BACKEND_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: e.target.checked }), // JS → JSON (string)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      task.remove();
      addTaskToDOM(data);
      updateCount();
    } catch (error) {
      console.error(error.message);
    }
  }
}

function personalizeUI() {
  nameSpan.textContent = username;
  characterImg.src = character;
}
