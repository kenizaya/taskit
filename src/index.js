import './styles/main.css';
import { displaySidebar, displayMainHeader } from './render';
import {addNewTaskListener} from './helperFunctions';

displaySidebar();
displayMainHeader();
addNewTaskListener();