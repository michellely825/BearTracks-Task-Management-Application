const tasks = [];
const backButton = document.getElementById("back-button");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

backButton.addEventListener("click", goBack);
addButton.addEventListener("click", addTask);

function goBack() {
  window.location.href = `index.html`;
}

function addTask() {
  if (taskInput.value != "") {
    tasks.push(taskInput.value);

    const newTask = document.createElement("li");
    const delButton = document.createElement("button");
    newTask.innerHTML = taskInput.value;

    delButton.innerHTML = "X";
    delButton.className = "del-button";
    delButton.addEventListener("click", removeTask);
    // delButton.id = ""; // assign each del button w unique id?

    taskList.append(newTask);
    newTask.append(delButton);

    taskInput.value = "";
    console.log(tasks);
  }
}

function createTaskObject(taskInput) {
  const newTaskObj = {};
  newTaskObj.value = taskInput;

  const newTask = document.createElement("li");
  const delButton = document.createElement("button");
  newTask.innerHTML = taskInput.value;

  delButton.innerHTML = "X";
  delButton.className = "del-button";
  delButton.addEventListener("click", removeTask);
  return newTask;
}

function removeTask(e) {
  e.target.remove();
}

// function createTaskItem() {

// }
