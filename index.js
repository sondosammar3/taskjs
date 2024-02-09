
(function initpage(){


    const addButton = document.querySelector(".header button");
    const taskList = document.querySelector("#taskList");
    const removecheckedButton = document.querySelector('.removechecked')
    const inputTask = document.getElementById("input_task");
    
    
    
    let tasks = []
    let completdTasksStorage = []
    
    
    addButton.addEventListener("click", () => {
        const input_task = document.querySelector("#input_task")?.value;
        if (input_task) {
            const object = {
                value: input_task,
                id: new Date().getTime(),
                isCompleted: false
            }
            addToLocalStorage(object);
            addtolist(object);
            document.querySelector("#input_task").value = ""; // check from this line
        }
    });
    
    inputTask.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addButton.click();
        }
    });
    
    removecheckedButton.addEventListener("click", () => {
    
        const completedTasks = taskList.querySelectorAll("li input[type='checkbox']:checked");
    
        tasks = tasks.filter((task) => {
            const isCompeted = [...completedTasks].map(el =>
                el.closest("li").querySelector("label").textContent).includes(task.value);
            return !isCompeted;
        });
        
        
       let f = Array.from(completedTasks).map((ele) =>
            new Object({ value: ele.closest("li").querySelector("label").textContent, id: ele.id, isCompleted: true })
        );
        completdTasksStorage=getCompletedTasksFromLocalStorage()
       f.forEach((e)=>{
        completdTasksStorage.push(e)
       })
        updatecompletedTasks()
    
        completedTasks.forEach((element) => {
            element.closest("li")?.remove();
        });
    
        updatTasks()
    
    });
    
    const addtolist = (item) => {
     
        let element = document.createElement("li")
        element.id = item.id// add id for li
    
        element.innerHTML = `
            <div class="text">
                <input type="checkbox" id=_${item.id}>
                <label for="_${item.id}">${item.value}</label>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen pen" id=_${item.id}></i>
                <i class="fa-solid fa-xmark" id=_${item.id}></i>
            </div>
        `
    
        element.querySelector(".fa-xmark").addEventListener("click", () => {
            const taskId = item.id;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].isCompleted = true;
                const completedTask = tasks.splice(taskIndex, 1)[0];
                completdTasksStorage=getCompletedTasksFromLocalStorage()
                completdTasksStorage.push(completedTask);
                updatTasks();
                updatecompletedTasks();
                element.remove();
            }
        });

        element.querySelector(".fa-pen").addEventListener("click", () => {
            const taskId = item.id;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
    
            if (taskIndex !== -1) {
                const newTaskText = prompt("Enter the new task text:", tasks[taskIndex].value);
                if (newTaskText !== null) {
                    tasks[taskIndex].value = newTaskText;
                    element.querySelector("label").textContent = newTaskText;
                    updatTasks();
                }
            }
        });
        taskList.appendChild(element)
    }
    
    function addToLocalStorage(task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    function getFromLocalStorage() {
        let data = [];
        if (localStorage.getItem("tasks")) {
            data = JSON.parse(localStorage.getItem("tasks"));
        }
        return data;
    }
    function getCompletedTasksFromLocalStorage() {
        let data = [];
        if (localStorage.getItem("completedTasks")) {
            data = JSON.parse(localStorage.getItem("completedTasks"));
        }
        return data;
    }
    
    
    (function initList() {
        tasks = getFromLocalStorage();
        tasks.forEach((el) => {
            addtolist(el);
        });
    
    })();
    
    
    function updatecompletedTasks() {
        localStorage.setItem("completedTasks", JSON.stringify(completdTasksStorage));
    }
    function updatTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    
    
    
})();