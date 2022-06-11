import { get, createTask, projects, } from './taskit';
import { displayTasks } from './render';

export const removeElements = (container) => {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

export const addNewTaskListener = () => {
    const newTask = document.getElementById("new-task");
    const newTaskForm = document.getElementById("new-task-form");
    newTask.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && e.target.value) {
            const currentProject = get.currentProject.textContent;
            e.preventDefault();
            createTask(currentProject, e.target.value, "", newTaskForm.elements['dueDate'].value, newTaskForm.elements['priority'].value);
            e.target.value = "";
            localStorage.setItem("projects", JSON.stringify(projects));
            displayTasks(currentProject);
        }
    })
}