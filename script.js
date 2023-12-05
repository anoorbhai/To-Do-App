try {
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDate = document.getElementById("due-date");
const currentTheme = localStorage.getItem("theme");
var todoApp = document.querySelector('.todo-app');
var container = document.querySelector('.container');

if (currentTheme === 'dark') {
    todoApp.classList.add('dark-mode');
    container.classList.add('dark-mode');
    document.getElementById('theme-toggle').checked = true;
}
else {
    todoApp.classList.remove('dark-mode');
    container.classList.remove('dark-mode');
    document.getElementById('theme-toggle').checked = false;
}

document.getElementById('theme-toggle').addEventListener('click', function() {
    let theme = 'light';
    if (this.checked) {
        todoApp.classList.add('dark-mode');
        container.classList.add('dark-mode');
        theme = 'dark';
    }
    else {
        todoApp.classList.remove('dark-mode');
        container.classList.remove('dark-mode');
    }
    localStorage.setItem("theme", theme);
    }
);
    
let tasks = [];

function addTask() {
    if (inputBox.value === '' || dueDate.value === '') {
        document.getElementById("alertModal").style.display = "block";
    }
    else {
        let task = {
            text: inputBox.value,
            dueDate: new Date(dueDate.value).toLocaleDateString()
        };
        tasks.push(task);
        displayTask(task);
    }
    inputBox.value = "";
    dueDate.value = "";
    saveData();
}
    
function displayTask(task) {
    let li = document.createElement("li");
    li.innerText = task.text;

    let dueDateP = document.createElement("small");
    dueDateP.classList.add("due-date");
    dueDateP.innerText = task.dueDate;
    li.appendChild(dueDateP);

    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
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

    saveData();
}

function saveTitle(titleElement) {
    localStorage.setItem('boardTitle', titleElement.textContent);
}
        
listContainer.addEventListener("click", function (e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.textContent === "\u00d7") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

window.onclick = function(event) {
    var modal1 = document.getElementById("alertModal");
    if (event.target === modal1) {
        modal1.style.display = 'none';
    }

    var modal2 = document.getElementById("clearModal");
    if (event.target === modal2) {
        modal2.style.display = 'none';
    }
}

function confirmClear() {
    document.getElementById("clearModal").style.display = "block";

    document.getElementById("yesButton").addEventListener('click', function() {
        listContainer.innerText = "";
        localStorage.removeItem("data");
        document.getElementById("clearModal").style.display = "none";
    });

    document.getElementById("noButton").addEventListener('click', function() {
        document.getElementById("clearModal").style.display = "none";
    });
}

    
function saveData() {
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem("data"));
    if (savedTasks) {
        tasks = savedTasks;
        tasks.forEach(task => displayTask(task));
    }

    const titleElement = document.querySelector(`.todo-app h2`);
    const savedTitle = localStorage.getItem(`boardTitle`);
    if (savedTitle) {
        titleElement.textContent = savedTitle;
    }
}

showTask();

}
catch (error){
    console.error("An error occurred: ", error);
}

