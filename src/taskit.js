import IconFileTree from './assets/file-tree.svg';
import IconCalendar from './assets/calendar.svg';
import IconDropdown from './assets/dropdown.svg';
import IconPlus from './assets/plus.svg';
import IconSubmit from './assets/submit.svg';

const get = {
    currentProject: document.querySelector(".current-project"),
}

const projects = {
    "Inbox": [
        {
            title: "Task Title",
            description: "Task description",
            dueDate: "2022-06-15",
            priority: "High",
        },
        {
            title: "Task Title2",
            description: "Task description2",
            dueDate: "2022-07-07",
            priority: "High",
        }],

    "website": [
        {
            title: "Web task Title2",
            description: "Web Task description2",
            dueDate: "2022-06-24",
            priority: "Normal",
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

const displayTasks = (proj) => {
    const form = document.getElementById("task-list-form");

    let project = proj === completedTasks ? completedTasks : projects[proj];

    let id = 0;

    removeElements(form);

    project.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        form.prepend(div);
    
        const taskContainer = document.createElement("input");
        taskContainer.setAttribute("type", "checkbox");
        taskContainer.setAttribute("id", `id${id}`);
        const taskIndex = taskContainer.id.substring(2);
        if (project === completedTasks) {
            taskContainer.checked = true;
            taskContainer.disabled = true;
        }

        if (project[taskIndex].priority === "High") {
            div.style.borderLeft = "2px solid #CF1124";
        } else if (project[taskIndex].priority === "Normal") {
            div.style.borderLeft = "2px solid #F0B429";
        } else if (project[taskIndex].priority === "Low") {
            div.style.borderLeft = "2px solid #724BB7";
        }
    
        const label = document.createElement("label");
        label.textContent = task.title;
        label.classList.add("task-checked");
        id++;

    
        div.append(taskContainer, label);

        taskContainer.addEventListener("click", () => {
            const currentProject = get.currentProject.textContent;
            completeTask(project, taskIndex);
            displayTasks(currentProject);
        }, {once: true});

        label.addEventListener('click', () => displayDescription(project[taskIndex]));

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
        removeElements(newTaskForm);
        get.currentProject.textContent = li.textContent;
        
        displayTasks(completedTasks);
    });

}

const displayDescription = (task) => {
    const descriptionContainer = document.querySelector(".description-container");
    removeElements(descriptionContainer);
    descriptionContainer.style.display = "block";
    const div = document.createElement("div");
    div.classList.add("date-priority-description");
    descriptionContainer.append(div);
    addDatePicker(descriptionContainer, "date-priority-description");
    addPriorityDropdown(descriptionContainer, "date-priority-description");

    const descriptionDate = document.querySelector(".description-container input[type='date']");
    descriptionDate.value = task.dueDate;

    const descriptionPriority = document.querySelector(".description-container select");
    descriptionPriority.value = task.priority;


    descriptionDate.onchange = () => task.dueDate = descriptionDate.value;
    descriptionPriority.onchange = () => {
        task.priority = descriptionPriority.value;
        console.log(projects);
    }


    createTextArea("current-task", 1, 33);
    createTextArea("current-task-description", 40, 40);

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

const createTextArea = (className, rows, columns) => {
    const descriptionContainer = document.querySelector(".description-container");
    const textArea = document.createElement("textarea");

    textArea.classList.add(className);
    textArea.setAttribute("rows", rows);
    textArea.setAttribute("cols", columns);
    textArea.setAttribute("spellcheck", false);

    if (className === "current-task-description") {
        textArea.setAttribute("placeholder", "Description");
    }

    descriptionContainer.appendChild(textArea);
}

const updateTitle = (task, title) => {
    task.title = title;
    console.log(projects);
}

const updateDescription = (task, description) => {
    task.description = description;
}

const addNewTaskListener = () => {
    const newTask = document.getElementById("new-task");
    const newTaskForm = document.getElementById("new-task-form");
    newTask.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.target.value) {
            const currentProject = get.currentProject.textContent;
            e.preventDefault();
            createTask(currentProject, e.target.value, "", newTaskForm.elements['dueDate'].value, newTaskForm.elements['priority'].value);
            e.target.value = "";
            displayTasks(currentProject);
        }
    })
}

const addPriorityDropdown = (form, containerClassName) => {
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

const addDatePicker = (form, containerClassName) => {
    const dateContainer = document.querySelector("." + containerClassName);
    const date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("name", "dueDate");
    date.setAttribute("id", "dueDate");


    dateContainer.append(date);
    form.append(dateContainer);
}

const removeElements = (container) => {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

displaySidebar();
displayMainHeader();
addNewTaskListener();