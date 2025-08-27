function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  input.value = "";
}
