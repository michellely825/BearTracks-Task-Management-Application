export function captureTask(taskInputValue) {
  if (taskInputValue === "") {
    return null;
  }
  return taskInputValue;
}

export function clearTaskInput(taskInput) {
  taskInput.value = "";
}
