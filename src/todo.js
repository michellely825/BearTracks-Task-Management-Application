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
    // newTask.append(delButton);

    taskInput.value = "";
    console.log(tasks);
  }
}

function createTask(taskValue) {
  let num = 0;
  const newTask = document.createElement("li");
  const newTaskInput = document.createElement("input");
  const newTaskLabel = document.createElement("label");
  const delButton = document.createElement("button");
  newTaskInput.type = "checkbox";
  newTaskInput.value = taskValue;
  newTaskInput.id = "task" + num;
  newTaskLabel.for = "task" + num;
  newTaskLabel.innerHTML = taskValue;
  num++;

  delButton.innerHTML = "X";
  delButton.className = "del-button";
  delButton.addEventListener("click", removeTask);
  newTask.append(newTaskInput);
  newTask.append(newTaskLabel);
  newTask.append(delButton);
  return newTask;
}

function removeTask(e) {
  e.target.remove();
}
