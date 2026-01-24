const BACKEND_URL = "http://localhost:3000";
const token = localStorage.getItem("token");

const backButton = document.getElementById("back-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

backButton.addEventListener("click", goBack);
addButton.addEventListener("click", addTask);
incompleteTasks.addEventListener("change", moveTask);
completedTasks.addEventListener("change", moveTask);

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
  addTaskToDOM(savedTask.task);
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
function addTaskToDOM(task) {
  incompleteTasks.append(createTask(task));
}

function createTask(taskValue) {
  const task = document.createElement("li");
  const tInput = document.createElement("input");
  const tLabel = document.createElement("label");

  const buttonDiv = document.createElement("div");
  const delButton = document.createElement("button");
  const delImg = document.createElement("img");
  const editButton = document.createElement("button");
  const editImg = document.createElement("img");

  tInput.type = "checkbox";

  tLabel.textContent = taskValue;
  tLabel.prepend(tInput);

  buttonDiv.className = "task-buttons-div";

  delImg.src = "/src/images/del (1).png";
  delImg.id = "del-img";
  delButton.id = "delete-button";
  delButton.append(delImg);
  delButton.addEventListener("click", removeTask);

  editImg.src = "/src/images/edit1smaller.png";
  editImg.id = "edit-img";
  editButton.id = "edit-button";

  editButton.append(editImg);
  editButton.addEventListener("click", editButton);

  buttonDiv.append(editButton);
  buttonDiv.append(delButton);

  task.append(tLabel);
  task.append(buttonDiv);
  return task;
}

function removeTask(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}
