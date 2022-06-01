import './styles/main.css';
import {createTask, getTask, completeTask, changePriority, createProject} from './taskit';

console.log("Hello 123");

console.log(getTask());

createTask("t3", "d3", "dd3", "l");

console.log("after: ", getTask());

changePriority(0, "Low");
createProject("website blog");

completeTask(1);


