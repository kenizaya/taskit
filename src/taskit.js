import IconFileTree from './assets/file-tree.svg';
import IconCalendar from './assets/calendar.svg';
import IconDropdown from './assets/dropdown.svg';
import IconPlus from './assets/plus.svg';
import IconSubmit from './assets/submit.svg';

const projects = {
    "Inbox": [
        {
            title: "Task Title",
            description: "Task description",
            dueDate: "Task date",
            priority: "High",
        },
        {
            title: "Task Title2",
            description: "Task description2",
            dueDate: "Task date2",
            priority: "High2",
        }],

    "website": [
        {
            title: "Web task Title2",
            description: "Web Task description2",
            dueDate: "Web Task date2",
            priority: "Web High2",
        }
    ],
};

const completedTasks = [];

export const createProject = (project) => {
    projects[project] = [];
        
}

export const createTask = (project, title, description = "None", dueDate = "Today", priority = "Low") => {
    const task = {};
    task.title= title;
    task.description= description;
    task.dueDate= dueDate;
    task.priority= priority;
    console.log(task, "from createTask");
    console.log(project);
    projects[project].push(task);
}

export const getTask = (project) => projects[project];

export const deleteTask = (project, index) => projects[project].splice(index, 1);

export const completeTask = (project, index) => {
    console.log("tasks:", project);
    completedTasks.push(project[index]);
    project.splice(index, 1);

    
    console.log("completed tasks:", completedTasks);
}

export const changePriority = (project, index, priority) =>  projects[project][index].priority = priority;

const displaySidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const ul = document.querySelector("ul");

    const div = document.createElement("div");
    div.classList.add("sidebar-projects");

    const h3 = document.createElement("h3");
    h3.textContent = "Projects";

    const newProjectForm = document.querySelector("#new-project-form");
    const btnSubmitProject = document.createElement("input");
    btnSubmitProject.setAttribute("type", "image");
    btnSubmitProject.src = IconSubmit;
    newProjectForm.appendChild(btnSubmitProject);

    sidebar.prepend(div);
    div.appendChild(h3);

    const plusIcon = new Image();
    plusIcon.src = IconPlus;

    div.appendChild(plusIcon);

    div.addEventListener('click', () => {
        newProjectForm.style.display = newProjectForm.style.display === "flex" ? "none" : "flex";
    });

    newProjectForm.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.target.value) {
            e.preventDefault();
            createProject(e.target.value);
            const li = document.createElement("li");
            li.textContent = e.target.value;
            li.classList.add("sidebar-projects");
            ul.appendChild(li);
            li.addEventListener('click', () => {
                displayMainHeader(li.textContent);
                console.log(li.textContent);
            });

            console.log("projects", projects);

            e.target.value = "";
        }
    });

    Object.keys(projects).forEach(project => {
        const li = document.createElement("li");
        li.textContent = project;
        li.classList.add("sidebar-projects");
        ul.appendChild(li);
        li.addEventListener('click', () => {
            displayMainHeader(li.textContent)
            console.log(li.textContent);
        });
    });

    displayCompletedTasks();

}

const displayMainHeader = (project = "Inbox") => {

    const newTaskForm = document.querySelector("#new-task-form");
    const currentProject = document.querySelector(".current-project");
    const newTask = document.createElement("input");
    const newTaskLabel = document.createElement("label")

    while (newTaskForm.hasChildNodes()) {
        newTaskForm.removeChild(newTaskForm.firstChild);
    }

    newTask.setAttribute("type", "text");
    newTask.setAttribute("name", "new-task");
    newTask.setAttribute("id", "new-task");

    newTaskLabel.setAttribute("for", "new-task");

    newTaskForm.append(newTask, newTaskLabel);

    addNewTaskListener();


    document.querySelector(".project-icon > img").src = IconFileTree;

    currentProject.textContent = project;
    console.log("from displayMainHeader", project);
    newTask.placeholder = `+ Add task to "${currentProject.textContent}", press Enter to save`
    displayTasks(project);

    // if (newTask === document.activeElement) {
        
    // }
}

const displayTasks = (proj) => {
    const form = document.getElementById("task-list-form");

    let project = proj === completedTasks ? completedTasks : projects[proj];

    let id = 0;

    while(form.hasChildNodes()) {
        form.removeChild(form.firstChild);
    }
    project.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        form.prepend(div);
    
        const taskContainer = document.createElement("input");
        taskContainer.setAttribute("type", "checkbox");
        taskContainer.setAttribute("id", `id${id}`);
        if (project === completedTasks) {
            taskContainer.checked = true;
        }
    
        const label = document.createElement("label");
        label.textContent = task.title;
        // label.setAttribute("for", `id${id}`);
        label.classList.add("task-checked");
        id++;

    
        div.append(taskContainer, label);

        taskContainer.addEventListener("click", () => {
            const currentProject = document.querySelector(".current-project").textContent;
            completeTask(project, taskContainer.id.substring(2));
            displayTasks(currentProject);
        }, {once: true});

        label.addEventListener('click', () => {
            console.log("label", label);
        })

        console.log(project);

        
    })
    
}

const displayCompletedTasks = () => {
    const sidebar = document.querySelector(".sidebar");
    const newTaskForm = document.getElementById("new-task-form");

    const ul = document.createElement("ul");

    sidebar.appendChild(ul);

    const li = document.createElement("li");

    li.textContent = "Completed Tasks";

    ul.appendChild(li);

    li.addEventListener('click', () => {
        while (newTaskForm.hasChildNodes()) {
            newTaskForm.removeChild(newTaskForm.firstChild);
        }
        document.querySelector(".current-project").textContent = li.textContent;
        
        displayTasks(completedTasks);
    });

}

const addNewTaskListener = () => {
    const newTask = document.getElementById("new-task");
    newTask.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.target.value) {
            const currentProject = document.querySelector(".current-project").textContent;
            e.preventDefault();
            createTask(currentProject, e.target.value);
            e.target.value = "";
            displayTasks(currentProject);
        }
    })
}

displaySidebar();
displayMainHeader();
addNewTaskListener();




