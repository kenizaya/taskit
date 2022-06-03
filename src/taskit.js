const projects = {
    "inbox": [
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

export const createTask = (project, title, description, dueDate, priority) => {
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

const displayMain = () => {
    const main = document.querySelector(".main");
    const currentProject = document.querySelector(".current-project");
    const newTask = document.querySelector("#new-task");

    currentProject.textContent = "Inbox";
    newTask.placeholder = `+ Add task to "${currentProject.textContent}", press Enter to save`
}

displaySidebar();
displayMain();