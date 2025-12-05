const tasks = [];
const backButton = document.getElementById("back-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

backButton.addEventListener("click", goBack);
addButton.addEventListener("click", addTaskToList);

function goBack() {
  window.location.href = `index.html`;
}

function addTaskToList() {
  if (taskInput.value != "") {
    tasks.push(taskInput.value);
    taskList.append(createTask(taskInput.value));
    taskInput.value = "";
    console.log(tasks);
  }
}

function createTask(taskValue) {
  const task = document.createElement("li");
  const tInput = document.createElement("input");
  const tLabel = document.createElement("label");
  const delButton = document.createElement("button");

  tInput.type = "checkbox";
  tLabel.textContent = taskValue;
  tLabel.prepend(tInput);

  delButton.innerHTML = "X";
  delButton.className = "del-button";
  delButton.addEventListener("click", removeTask);

  task.append(tLabel);
  task.append(delButton);
  return task;
}

function removeTask(e) {
  e.target.parentElement.remove();
}
