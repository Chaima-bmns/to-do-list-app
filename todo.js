document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("List-Container");
    const addButton = document.getElementById("add-button");
    const allFilter = document.getElementById("all");
    const pendingFilter = document.getElementById("pending");
    const completedFilter = document.getElementById("completed");

    addButton.addEventListener("click", addTask);
    allFilter.addEventListener("click", function() {
        showTasks("all");
        setActiveFilter(allFilter);
    });
    pendingFilter.addEventListener("click", function() {
        showTasks("pending");
        setActiveFilter(pendingFilter);
    });
    completedFilter.addEventListener("click", function() {
        showTasks("completed");
        setActiveFilter(completedFilter);
    });

    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("Checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    function addTask() {
        if (inputBox.value === '') {
            alert("You must write something!");
        } else {
            let li = document.createElement("li");
            li.textContent = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.textContent = "\u00d7";
            li.appendChild(span);
        }
        inputBox.value = "";
        saveData();
    }

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTasks(filter) {
        const tasks = listContainer.querySelectorAll("li");
        tasks.forEach(task => {
            if (filter === "all") {
                task.style.display = "block";
            } else if (filter === "completed") {
                task.style.display = task.classList.contains("Checked") ? "block" : "none";
            } else if (filter === "pending") {
                task.style.display = task.classList.contains("Checked") ? "none" : "block";
            }
        });
    }

    function setActiveFilter(filterElement) {
        const filters = document.querySelectorAll(".filters span");
        filters.forEach(filter => filter.classList.remove("active"));
        filterElement.classList.add("active");
    }

    function showAllTasks() {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            listContainer.innerHTML = storedData;
        }
        showTasks("all");
        setActiveFilter(allFilter);
    }

    showAllTasks();
});




