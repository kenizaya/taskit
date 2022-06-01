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