// Add Button functionality
const addList = document.forms["add-item"];
const input = document.getElementById("input");
const errorText = document.getElementById("error-text-con");

addList.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = addList.querySelector('input[type="text"]').value;
  if (value === "" || value == null) {
    input.classList.add("error");
    errorText.style.display = "block";
    alert("You must write something");
    return;
  } else {
    input.classList.remove("error");
    errorText.style.display = "none";
    createTaskElement(value);
    saveTask(value);
    input.value = "";
  }
});

// Creating Elements
function createTaskElement(value) {
  const ulList = document.querySelector("ul");
  const li = document.createElement("li");
  const name = document.createElement("span");
  const deleteButton = document.createElement("button");

  // Append to DOM
  ulList.appendChild(li);
  li.appendChild(name);
  li.appendChild(deleteButton);

  // Class list to the Elements
  li.classList = "list-item";
  name.textContent = value;
  name.classList = "list-text";
  deleteButton.textContent = "Done ✔";
  deleteButton.classList = "delete-button";
}

// Save to local Storage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local Storage
function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task));
}

document.addEventListener("DOMContentLoaded", loadTask);

// Delete button functionality
const ulList = document.querySelector(".box ul");
ulList.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.className === "delete-button") {
    const li = event.target.parentElement;
    ulList.removeChild(li);
    deleteTask(li.querySelector(".list-text").textContent);
  }
});

// Delete task from local Storage
function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// localStorage.clear()
