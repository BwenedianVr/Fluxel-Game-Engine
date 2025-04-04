// Store project data
let projectData = {
    gameObjects: [],  // Array to hold game objects
    scripts: []       // Array to hold scripts associated with objects
};

// Function to save a new game object
function saveGameObject(name, imgSrc, x = 0, y = 0, width = 100, height = 100) {
    const obj = {
        name,
        imgSrc,
        x,
        y,
        width,
        height,
        scripts: []  // Scripts associated with this object
    };
    projectData.gameObjects.push(obj);
}

// Function to save a script for a game object
function saveScriptToObject(objName, scriptContent) {
    // Find the object by name
    const obj = projectData.gameObjects.find(o => o.name === objName);
    
    if (obj) {
        // Create a script object to hold script content
        const script = {
            content: scriptContent,
            createdAt: new Date().toISOString()
        };
        obj.scripts.push(script);
        // Update the scripts list in the project data
        projectData.scripts.push(script);
    } else {
        console.error(`Object ${objName} not found!`);
    }
}

// Function to load all game objects
function loadGameObjects() {
    return projectData.gameObjects;
}

// Function to load scripts of a specific game object
function loadScriptsForObject(objName) {
    const obj = projectData.gameObjects.find(o => o.name === objName);
    
    if (obj) {
        return obj.scripts;
    } else {
        console.error(`Object ${objName} not found!`);
        return [];
    }
}

// Function to save the project data to local storage (optional)
function saveProject() {
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

// Function to load the project data from local storage (optional)
function loadProject() {
    const data = localStorage.getItem('projectData');
    if (data) {
        projectData = JSON.parse(data);
        console.log('Project data loaded');
    } else {
        console.log('No project data found');
    }
}

// Function to delete a game object
function deleteGameObject(objName) {
    const index = projectData.gameObjects.findIndex(o => o.name === objName);
    if (index > -1) {
        projectData.gameObjects.splice(index, 1);
    } else {
        console.error(`Object ${objName} not found!`);
    }
}

// Function to delete a script from an object
function deleteScriptFromObject(objName, scriptIndex) {
    const obj = projectData.gameObjects.find(o => o.name === objName);
    if (obj && obj.scripts[scriptIndex]) {
        obj.scripts.splice(scriptIndex, 1);
    } else {
        console.error(`Script not found for object ${objName}`);
    }
}

// Function to edit an existing script for an object
function editScriptForObject(objName, scriptIndex, newScriptContent) {
    const obj = projectData.gameObjects.find(o => o.name === objName);
    if (obj && obj.scripts[scriptIndex]) {
        obj.scripts[scriptIndex].content = newScriptContent;
    } else {
        console.error(`Script not found for object ${objName}`);
    }
}

// Function to initialize the project and load any saved data
function initializeProject() {
    loadProject();  // Load the project from local storage if exists
    updateGUI();    // Update the GUI with project data
}

// Function to update the GUI (to be implemented in gui.js)
function updateGUI() {
    // Call functions from gui.js to update project files, objects, and scripts
    // For example: guiUpdateGameObjects(projectData.gameObjects);
}

// Initialize project on page load
window.addEventListener('DOMContentLoaded', initializeProject);
