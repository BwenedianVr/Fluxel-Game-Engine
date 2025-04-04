let gameObjs = []; // Array to hold game objects
let gridVisible = false; // Flag for toggling grid visibility
let projectLoaded = false; // Flag for checking if project is loaded

// Create a new game object with an image
function createGameObj(name, imgSrc, x = 0, y = 0, width = 100, height = 100) {
  const obj = {
    name,
    img: new Image(),
    loaded: false,
    x, y,
    width, height,
    scripts: []
  };
  obj.img.onload = () => obj.loaded = true;
  obj.img.src = imgSrc;
  gameObjs.push(obj);
}

// Toggle grid visibility
function toggleGrid() {
  gridVisible = !gridVisible;
  drawGUI(); // Call draw to update grid visibility
}

// Open the create game object window
function openGameObjWindow() {
  const objWindow = document.createElement('div');
  objWindow.id = 'game-obj-window';
  objWindow.innerHTML = `
    <h3>Create Game Object</h3>
    <label for="obj-name">Name:</label>
    <input type="text" id="obj-name" placeholder="Object Name" />
    <label for="obj-img">Image URL:</label>
    <input type="text" id="obj-img" placeholder="Image URL" />
    <button onclick="addGameObj()">Create</button>
    <button onclick="closeGameObjWindow()">Close</button>
  `;
  document.body.appendChild(objWindow);
}

// Add the created game object to the game objects array
function addGameObj() {
  const name = document.getElementById('obj-name').value;
  const imgSrc = document.getElementById('obj-img').value;
  createGameObj(name, imgSrc);
  closeGameObjWindow();
  drawGUI(); // Update the scene after adding the new object
}

// Close the game object window
function closeGameObjWindow() {
  const objWindow = document.getElementById('game-obj-window');
  if (objWindow) {
    objWindow.remove();
  }
}

// Load a starter project with "assets" folder
function loadStarterProject() {
  if (!projectLoaded) {
    const assetsFolder = {
      name: 'assets',
      isFolder: true,
      files: []
    };
    gameObjs.push(assetsFolder);
    projectLoaded = true;
    drawGUI(); // Refresh the scene with the starter project
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadStarterProject();
});
