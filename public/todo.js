// const beginProgram = require("./index");
// console.log(username);
const tasks = [];
const backButton = document.getElementById("back-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

backButton.addEventListener("click", goBack);
addButton.addEventListener("click", addTaskToList);
incompleteTasks.addEventListener("change", moveTask);
completedTasks.addEventListener("change", moveTask);

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

function goBack() {
  window.location.href = `index.html`;
}

function addTaskToList() {
  if (taskInput.value != "") {
    tasks.push(taskInput.value);
    incompleteTasks.append(createTask(taskInput.value));
    taskInput.value = "";
    console.log(tasks);
  }
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

  buttonDiv.className = "button-div";

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
