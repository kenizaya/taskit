import './styles/main.css';
import {createTask, getTask, completeTask, changePriority, createProject} from './taskit';

console.log("Hello 123");

console.log(getTask());

createProject("test");

createTask("test", "t3", "d3", "dd3", "l");

console.log("after: ", getTask(["inbox"]));
console.log("Teset", getTask("test"));

changePriority("test", 0, "Low");
createProject("website blog");


