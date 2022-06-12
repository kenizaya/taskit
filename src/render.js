import { projects, get, completedTasks, createProject, completeTask, updateTitle,
        updateDescription, updateDate, updatePriority } from "./taskit";
        
import { removeElements, addNewTaskListener } from "./helperFunctions";
import IconFileTree from './assets/file-tree.svg';
import IconCursor from './assets/cursor.svg';


const { format, } = require("date-fns");

export const displaySidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const ul = document.querySelector(".projects-list");

    const div = document.createElement("div");
    div.classList.add("sidebar-projects");

    const h3 = document.createElement("h3");
    h3.textContent = "Projects";

    const newProjectForm = document.querySelector("#new-project-form");

    sidebar.prepend(div);
    div.appendChild(h3);

    newProjectForm.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.target.value) {
            e.preventDefault();
            createProject(e.target.value);
            localStorage.setItem("projects", JSON.stringify(projects));
            const li = document.createElement("li");
            li.textContent = e.target.value;
            li.classList.add("sidebar-projects");
            ul.appendChild(li);
            li.addEventListener('click', () => {
                displayMainHeader(li.textContent);
            });

            console.log("projects", projects);

            e.target.value = "";
        }
    });

    Object.keys(projects).forEach(project => {
        const li = document.createElement("li");
        li.textContent = project;
        li.classList.add("sidebar-projects");
        
        if (li.textContent === "Inbox") {
            document.querySelector(".inbox-completed > ul").append(li);
        } else {
            ul.appendChild(li);
        }
        li.addEventListener('click', () => {
            displayMainHeader(li.textContent)
            console.log(li.textContent);
        });
    });

    displayCompletedTasks();

}

export const displayMainHeader = (project = "Inbox") => {

    const newTaskForm = document.querySelector("#new-task-form");
    const currentProject = get.currentProject;
    const newTask = document.createElement("input");
    const newTaskLabel = document.createElement("label")
    const datePriorityContainer = document.createElement("div");
    
    removeElements(newTaskForm);

    datePriorityContainer.classList.add("date-priority-container");
    newTask.setAttribute("type", "text");
    newTask.setAttribute("name", "new-task");
    newTask.setAttribute("id", "new-task");

    newTaskLabel.setAttribute("for", "new-task");

    newTaskForm.append(newTask, newTaskLabel, datePriorityContainer);

    addDatePicker(newTaskForm, "date-priority-container");
    addPriorityDropdown(newTaskForm, "date-priority-container");
    addNewTaskListener();


    document.querySelector(".project-icon > img").src = IconFileTree;

    currentProject.textContent = project;
    console.log("from displayMainHeader", project);
    newTask.placeholder = `+ Add task to "${currentProject.textContent}", press Enter to save`
    displayTasks(project);

}

export const displayTasks = (proj) => {
    const form = document.getElementById("task-list-form");

    let project = proj === completedTasks ? completedTasks : projects[proj];

    let id = 0;

    removeElements(form);

    project.forEach(task => {
        const taskContainerDiv = document.createElement("div");
        const div = document.createElement("div");
        const date = document.createElement("span");
        const year = task.dueDate.substring(0, 4);
        const month = task.dueDate.substring(5, 7) - 1;
        const day = task.dueDate.substring(8, 10);

        date.append(format(new Date(year, month, day), "d MMM"));

        taskContainerDiv.classList.add("task-container-div");
        div.classList.add("task");
        form.prepend(taskContainerDiv);
    
        const taskContainer = document.createElement("input");
        taskContainer.setAttribute("type", "checkbox");
        taskContainer.setAttribute("id", `id${id}`);
        const taskIndex = taskContainer.id.substring(2);
        if (project === completedTasks) {
            taskContainer.checked = true;
            taskContainer.disabled = true;
        }

        if (task.priority === "High") {
            div.style.borderLeft = "2px solid #CF1124";
            date.style.color = "#CF1124";
        } else if (task.priority === "Normal") {
            div.style.borderLeft = "2px solid #F0B429";
            date.style.color = "#F0B429";
        } else if (task.priority === "Low") {
            div.style.borderLeft = "2px solid #724BB7";
            date.style.color = "#724BB7";
        }
    
        const label = document.createElement("label");
        label.textContent = task.title;
        label.classList.add("task-checked");
        id++;

    
        div.append(taskContainer, label);
        taskContainerDiv.append(div, date);

        taskContainer.addEventListener("click", () => {
            const currentProject = get.currentProject.textContent;
            completeTask(project, taskIndex);
            displayTasks(currentProject);
        }, {once: true});

        taskContainerDiv.addEventListener('click', () => displayDescription(task));
    })
}

export const displayCompletedTasks = () => {
    const inboxCompleted = document.querySelector(".inbox-completed");
    const newTaskForm = document.getElementById("new-task-form");

    const ul = document.querySelector(".inbox-completed > ul");

    inboxCompleted.appendChild(ul);

    const li = document.createElement("li");

    li.textContent = "Completed Tasks";

    ul.prepend(li);

    li.addEventListener('click', () => {
        removeElements(newTaskForm);
        get.currentProject.textContent = li.textContent;
        
        displayTasks(completedTasks);
    });

}

document.querySelector(".cursor").src = IconCursor;


export const displayDescription = (task) => {
    const descriptionContainer = document.querySelector(".description-container");
    const div = document.createElement("div");

    removeElements(descriptionContainer);
    descriptionContainer.style.display = "block";

    div.classList.add("date-priority-description");
    descriptionContainer.append(div);

    addDatePicker(descriptionContainer, "date-priority-description");
    addPriorityDropdown(descriptionContainer, "date-priority-description");

    const descriptionDate = document.querySelector(".description-container input[type='date']");
    descriptionDate.value = task.dueDate;
    descriptionDate.onchange = () => updateDate(task, descriptionDate.value);

    const descriptionPriority = document.querySelector(".description-container select");
    descriptionPriority.value = task.priority;
    descriptionPriority.onchange = () => updatePriority(task, descriptionPriority.value);

    createTextArea("current-task", 1, 33);
    createTextArea("current-task-description", 40, 33);

    const currentTask = document.querySelector(".current-task");
    const currentTaskDescription = document.querySelector(".current-task-description");

    currentTask.value = task.title;
    currentTaskDescription.value = task.description;

    currentTask.addEventListener('input', () => {
        updateTitle(task, currentTask.value);
        
    });

    currentTaskDescription.addEventListener('input', () => {
        updateDescription(task, currentTaskDescription.value);
    });
}

export const createTextArea = (className, rows, columns) => {
    const descriptionContainer = document.querySelector(".description-container");
    const textArea = document.createElement("textarea");

    textArea.classList.add(className);
    textArea.setAttribute("rows", rows);
    textArea.setAttribute("cols", columns);
    textArea.setAttribute("spellcheck", false);

    if (className === "current-task") {
        textArea.setAttribute("placeholder", "What needs doing?");
    }

    if (className === "current-task-description") {
        textArea.setAttribute("placeholder", "Description");
    }

    descriptionContainer.appendChild(textArea);
}

export const addPriorityDropdown = (form, containerClassName) => {
    const priorityContainer = document.querySelector("." + containerClassName);

    const select = document.createElement("select");
    const high = document.createElement("option");
    const normal = document.createElement("option");
    const low = document.createElement("option");

    select.setAttribute("name", "priority");
    select.setAttribute("id", "priority");


    high.textContent = "High";
    high.setAttribute("value", "High");
    high.style.color = "#CF1124";

    normal.textContent = "Normal";
    normal.setAttribute("value", "Normal");
    normal.style.color = "#CB6E17";

    low.textContent = "Low";
    low.setAttribute("value", "Low");
    low.setAttribute("selected", '');
    low.style.color = "#724BB7";

    priorityContainer.append(select);
    form.append(priorityContainer);
    select.append(high, normal, low);
}

export const addDatePicker = (form, containerClassName) => {
    const dateContainer = document.querySelector("." + containerClassName);
    const date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("name", "dueDate");
    date.setAttribute("id", "dueDate");
    date.value = format(new Date(), "yyyy-MM-dd");

    dateContainer.append(date);
    form.append(dateContainer);
}