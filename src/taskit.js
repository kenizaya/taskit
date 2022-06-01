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
    projects[project].push(task);
}

export const getTask = () => tasks;

export const deleteTask = (index) => tasks.splice(index, 1);

export const completeTask = (index) => {
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);

    console.log("tasks:",tasks);
    console.log("completed tasks:", completedTasks);
}

export const changePriority = (index, priority) =>  tasks[index].priority = priority;