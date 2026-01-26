const BACKEND_URL = "http://localhost:3000";
const token = localStorage.getItem("token"); //TODO: do refresh token?
const username = localStorage.getItem("username");
const character = localStorage.getItem("characterImg");

const signOutButton = document.getElementById("sign-out-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const incompleteTaskList = document.getElementById("incomplete-task-list");
const completedTaskList = document.getElementById("completed-task-list");
const nameSpan = document.getElementById("username-span");
const countSpan = document.getElementById("complete-tasks-count-span");
const characterImg = document.getElementById("user-char-img");

signOutButton.addEventListener("click", signOut);
addButton.addEventListener("click", addTask);
document.addEventListener("click", updateTaskStatus);
//TODO: sign out button instead of back button

// runs when the page is first loaded or gets refreshed
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
    updateCount(data.todos);
  } catch (error) {
    console.error(error.message);
  }
});

function signOut() {
  window.location.href = `index.html`;
}

// update status
async function updateTaskStatus(e) {
  if (e.target.type == "checkbox") {
    const task = e.target.parentElement;

    try {
      const response = await fetch(`${BACKEND_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: e.target.checked }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      e.target.parentElement.remove();
      addTaskToDOM(data);
      updateCount();
    } catch (error) {
      console.error(error.message);
    }
  }
}

function updateCount() {
  const completedElements = document.querySelectorAll(".completed");
  countSpan.textContent = completedElements.length;
}

// function moveTask(e) {
//   if (e.target.type == "checkbox") {
//     e.target.parentElement.parentElement.remove();
//     const task = createTask(e.target.parentElement.textContent);
//     if (e.target.checked) {
//       console.log("checked");
//       task.querySelector('input[type="checkbox"]').checked = true;
//       task.className = "completed";
//       completedTasks.append(task);
//     } else {
//       console.log("unchecked");
//       task.classList.remove("completed");
//       incompleteTasks.append(task);
//     }
//   }
// }

async function addTask() {
  const task = captureTask();
  if (!task) return; // stop if input is empty
  const savedTask = await sendTaskToServer(task);
  if (!savedTask) return; // stop if server fails and returns null
  addTaskToDOM(savedTask);
}

// reads what the user typed
function captureTask() {
  const task = taskInput.value;
  if (task != "") {
    console.log(task);
    taskInput.value = "";
    return task;
  }
  return null;
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
  delImg.src = "/src/images/del (1).png";
  delImg.id = "del-img";
  delButton.append(delImg);
  delButton.addEventListener("click", deleteTask);

  const editButton = document.createElement("button");
  editButton.id = "edit-button";
  const editImg = document.createElement("img");
  editImg.src = "/src/images/edit1smaller.png";
  editImg.id = "edit-img";
  editButton.append(editImg);
  editButton.addEventListener("click", updateTaskContent);

  buttonDiv.append(editButton, delButton);

  // const content = tInput.append(tSpan);
  task.append(tInput, tSpan, buttonDiv);

  return task;
}

// function createTask(taskValue) {
//   const task = document.createElement("li");
//   const tInput = document.createElement("input");
//   const tLabel = document.createElement("label");

//   const buttonDiv = document.createElement("div");
//   const delButton = document.createElement("button");
//   const delImg = document.createElement("img");
//   const editButton = document.createElement("button");
//   const editImg = document.createElement("img");

//   tInput.type = "checkbox";

//   tLabel.textContent = taskValue;
//   tLabel.prepend(tInput);

//   buttonDiv.className = "task-buttons-div";

//   delImg.src = "/src/images/del (1).png";
//   delImg.id = "del-img";
//   delButton.id = "delete-button";
//   delButton.append(delImg);
//   delButton.addEventListener("click", removeTask);

//   editImg.src = "/src/images/edit1smaller.png";
//   editImg.id = "edit-img";
//   editButton.id = "edit-button";

//   editButton.append(editImg);
//   editButton.addEventListener("click", updateTask);

//   buttonDiv.append(editButton);
//   buttonDiv.append(delButton);

//   task.append(tLabel);
//   task.append(buttonDiv);
//   return task;
// }

async function deleteTask(e) {
  const task = e.target.closest("li");
  console.log("id:::", task.id);
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
  } catch (error) {
    console.error(error.message);
  }

  // e.target.parentElement.parentElement.parentElement.remove();
}

function updateTaskContent(e) {
  const li = e.target.closest("li");
  const tSpan = li.querySelector("span");
  tSpan.contentEditable = "true";
  tSpan.focus();

  // replace text with input
  // listen for Enter key
  // send update to backend
  // update UI
}

function personalizeUI() {
  nameSpan.textContent = username;
  characterImg.src = character;
}
