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
  const delButton = document.createElement("button");

  tInput.type = "checkbox";

  tLabel.textContent = taskValue;
  tLabel.prepend(tInput);

  delButton.innerHTML = "X";
  delButton.className = "button";
  delButton.id = "del-button";
  delButton.addEventListener("click", removeTask);

  task.append(tLabel);
  task.append(delButton);
  return task;
}

function removeTask(e) {
  e.target.parentElement.remove();
}
