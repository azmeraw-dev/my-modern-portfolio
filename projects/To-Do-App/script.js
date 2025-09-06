const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const allBtn = document.getElementById('all');
const completedBtn = document.getElementById('completed');
const pendingBtn = document.getElementById('pending');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

function saveTasks() {
  const tasksToSave = [];
  document.querySelectorAll('li').forEach(li => {
    tasksToSave.push({
      text: li.dataset.text,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasksToSave));
}

function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.text = text;

  if (completed) li.classList.add('completed');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = "✓";
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "🗑";
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  addTaskToDOM(taskText);
  taskInput.value = '';
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    addTaskToDOM(taskText);
    taskInput.value = '';
  }
});

allBtn.addEventListener('click', () => {
  document.querySelectorAll('li').forEach(li => li.style.display = 'flex');
});

completedBtn.addEventListener('click', () => {
  document.querySelectorAll('li').forEach(li => {
    li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
  });
});

pendingBtn.addEventListener('click', () => {
  document.querySelectorAll('li').forEach(li => {
    li.style.display = li.classList.contains('completed') ? 'none' : 'flex';
  });
});
