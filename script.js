const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDate = document.getElementById("due-date");


document.getElementById('theme-toggle').addEventListener('click', function() {
    var todoApp = document.querySelector('.todo-app');
    if (this.checked) {
        todoApp.classList.add('dark-mode');
    } else {
        todoApp.classList.remove('dark-mode');
    }
});

function addTask(boardNumber) {
    if (inputBox.value === '' || dueDate.value === '') {
        alert("Enter task and due date");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let dueDateSpan = document.createElement("span");
        dueDateSpan.classList.add("due-date");
        dueDateSpan.innerHTML = new Date(dueDate.value).toLocaleDateString();
        li.appendChild(dueDateSpan);

        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    dueDate.value = "";
    saveData();
}


function sortTasks() {
    const tasks = Array.from(listContainer.children);

    tasks.sort((a, b) => {
        const dateA = a.querySelector(".due-date").textContent.split("/").reverse().join("-");
        const dateB = b.querySelector(".due-date").textContent.split("/").reverse().join("-");
        return new Date(dateA) - new Date(dateB);
    });

    tasks.forEach(task => listContainer.removeChild(task));

    tasks.forEach(task => listContainer.appendChild(task));

    localStorage.setItem('data', listContainer.innerHTML)
}

function saveTitle(titleElement) {
    localStorage.setItem('boardTitle', titleElement.textContent);
}
        
listContainer.addEventListener("click", function (e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function deleteAllTasks() {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";
        localStorage.clear();
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem(`data`);

    const titleElement = document.querySelector(`.todo-app h2`);
    const savedTitle = localStorage.getItem(`boardTitle`);
    if (savedTitle) {
        titleElement.textContent = savedTitle;
    }
}

showTask();
