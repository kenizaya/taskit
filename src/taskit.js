import { displayTasks } from "./render";

const { addDays, format, } = require("date-fns");

export const get = {
    currentProject: document.querySelector(".current-project"),
}

export let projects = {
    'Inbox': [
        {
            title: 'Water the plants',
            description: "I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.\
                            Don't underestimate the Force.\
                            I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.",
            dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
            priority: 'Normal',
        },
        {
            title: 'Get Milk',
            description: "I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.\
                            Don't underestimate the Force.\
                            I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.",
            dueDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
            priority: 'Low',
        },
        {
            title: 'Cook delicious dinner',
            description: "I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.\
                            Don't underestimate the Force.\
                            I need your help, Luke. She needs your help.\
                            I'm getting too old for this sort of thing.",
            dueDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
            priority: 'High',
        },
    ],

    'Website': [
        {
            title: 'Change font size to 1.4rem',
            description: "I suggest you try it again, Luke.\
                            This time, let go your conscious self and act on instinct.\
                            What?! I suggest you try it again, Luke.\
                            Look, I can take you as far as Anchorhead.\
                            You can get a transport there to Mos Eisley or wherever you're going.",
            dueDate: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
            priority: 'Normal',
        }
    ],
};

export let completedTasks = [];


if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

if (!localStorage.getItem("completedTasks")) {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

projects = JSON.parse(localStorage.getItem("projects"));
completedTasks = JSON.parse(localStorage.getItem("completedTasks"));

console.log(localStorage);

export const createProject = (project) => {
    projects[project] = []       
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

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    project.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
}

export const updateTitle = (task, title) => {
    task.title = title;
    localStorage.setItem("projects", JSON.stringify(projects));
    displayTasks(get.currentProject.textContent);
    
    console.log(projects);
}

export const updateDescription = (task, description) => {
    task.description = description;
    localStorage.setItem("projects", JSON.stringify(projects));
}

export const updatePriority = (task, priority) => {
    task.priority = priority;
    localStorage.setItem("projects", JSON.stringify(projects));
    displayTasks(get.currentProject.textContent);
} 

export const updateDate = (task, date) => {
    task.dueDate = date;
    localStorage.setItem("projects", JSON.stringify(projects));
    displayTasks(get.currentProject.textContent);
}