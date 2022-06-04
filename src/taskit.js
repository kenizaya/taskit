import IconFileTree from './assets/file-tree.svg';
import IconCalendar from './assets/calendar.svg';
import IconDropdown from './assets/dropdown.svg';

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
    console.log(projects[project]);
    projects[project].push(task);
}

export const getTask = (project) => projects[project];

export const deleteTask = (project, index) => projects[project].splice(index, 1);

export const completeTask = (project, index) => {
    console.log("tasks:",projects[project]);
    completedTasks.push(projects[project][index]);
    projects[project].splice(index, 1);

    
    console.log("completed tasks:", completedTasks);
}

export const changePriority = (project, index, priority) =>  projects[project][index].priority = priority;

const displaySidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const ul = document.querySelector("ul");

    Object.keys(projects).forEach(project => {
        const li = document.createElement("li");
        li.textContent = project;
        ul.appendChild(li);
    });

}

const displayMainHeader = () => {
    const mainHeader = document.querySelector(".main-header");
    const currentProject = document.querySelector(".current-project");
    const newTask = document.querySelector("#new-task");

    document.querySelector(".project-icon > img").src = IconFileTree;

    currentProject.textContent = "Inbox";
    newTask.placeholder = `+ Add task to "${currentProject.textContent}", press Enter to save`

    // if (newTask === document.activeElement) {
        
    // }
}

const displayTasks = () => {
    const mainTasks = document.querySelector(".main-tasks");

    const form = document.createElement("form");
    mainTasks.appendChild(form);

    let id = 0;

    Object.keys(projects).forEach(project => {
        const div = document.createElement("div");
        div.classList.add("task");
        form.appendChild(div);

        const task = document.createElement("input");
        task.setAttribute("type", "checkbox");
        task.setAttribute("id", `id${id}`);
        

        const label = document.createElement("label");
        label.textContent = projects[project][0].title;
        label.setAttribute("for", `id${id}`);
        label.classList.add("task-checked");
        id++;

        div.append(task, label);
    });
}

const addTask = () => {
    const currentProject = document.querySelector(".current-project");
    const newTask = document.getElementById("new-task");

    newTask.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            // createTask(projects[currentProject], )
            e.preventDefault();
            console.log(currentProject);
        }
    })
    
}

displaySidebar();
displayMainHeader();
displayTasks();