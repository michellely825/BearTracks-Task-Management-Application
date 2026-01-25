const BACKEND_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const backButton = document.getElementById("back-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");
const nameSpan = document.getElementById("username-span");

backButton.addEventListener("click", goBack);
addButton.addEventListener("click", addTask);
incompleteTasks.addEventListener("change", moveTask);
completedTasks.addEventListener("change", moveTask);

//TODO: sign out button instead of back button
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
    updateNameUI(data.username);
    for (const todo of data.todos) {
      if (!todo.completed) {
        addTaskToDOM(todo._id, todo.task);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

function goBack() {
  window.location.href = `index.html`;
}

function moveTask(e) {
  if (e.target.type == "checkbox") {
    e.target.parentElement.parentElement.remove();
    const task = createTask(e.target.parentElement.textContent);
    if (e.target.checked) {
      console.log("checked");
      task.querySelector('input[type="checkbox"]').checked = true;
      task.className = "completed";
      completedTasks.append(task);
    } else {
      console.log("unchecked");
      task.classList.remove("completed");
      incompleteTasks.append(task);
    }
  }
}

async function addTask() {
  const task = captureTask();
  if (!task) return; // stop if input is empty
  const savedTask = await sendTaskToServer(task);
  if (!savedTask) return; // stop if server fails and returns null
  addTaskToDOM(savedTask._id, savedTask.task);
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
function addTaskToDOM(taskID, task) {
  incompleteTasks.append(createTask(taskID, task));
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
  delButton.addEventListener("click", removeTask);

  const editButton = document.createElement("button");
  editButton.id = "edit-button";
  const editImg = document.createElement("img");
  editImg.src = "/src/images/edit1smaller.png";
  editImg.id = "edit-img";
  editButton.append(editImg);
  editButton.addEventListener("click", updateTask);

  buttonDiv.append(editButton, delButton);

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

async function removeTask(e) {
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

function updateTask(e) {
  const li = e.target.closest("li");
  const tSpan = li.querySelector("span");
  tSpan.contentEditable = "true";
  tSpan.focus();

  // replace text with input
  // listen for Enter key
  // send update to backend
  // update UI
}

function updateNameUI(username) {
  nameSpan.textContent = username;
}
