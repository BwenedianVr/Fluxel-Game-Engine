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
// Create the top bar UI (File menu, options)
function createTopBar() {
  const topBar = document.createElement('div');
  topBar.id = 'top-bar';
  topBar.innerHTML = `
    <div class="dropdown">
      <button class="dropbtn">Options</button>
      <div class="dropdown-content">
        <a href="#" onclick="newProject()">New</a>
        <a href="#" onclick="loadProject()">Load</a>
        <a href="#" onclick="saveProject()">Save</a>
        <a href="#" onclick="openGameObjWindow()">Create Game Object</a>
        <a href="#" onclick="closeOptions()">Close</a>
      </div>
    </div>
    <div class="title">
      <h1>Fluxel Editor</h1>
    </div>
  `;
  document.body.prepend(topBar);

  // Handle dropdown toggle
  topBar.querySelector(".dropbtn").addEventListener("click", () => {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });
}

// Close the options dropdown
function closeOptions() {
  const dropdown = document.querySelector('.dropdown-content');
  if (dropdown) dropdown.style.display = 'none';
}

// Create left side tab for searching files and assets
function createLeftTab() {
  const leftTab = document.createElement('div');
  leftTab.id = 'left-tab';
  leftTab.innerHTML = `
    <h3>Search Files</h3>
    <input type="text" id="file-search" placeholder="Search..." />
    <h3>Assets</h3>
    <ul id="asset-list">
      <li><img src="editorIcons/folder.png" alt="Folder" /> Assets (undeletable)</li>
    </ul>
  `;
  document.body.appendChild(leftTab);
}

// Create right side tab for viewing file data
function createRightTab() {
  const rightTab = document.createElement('div');
  rightTab.id = 'right-tab';
  rightTab.innerHTML = `
    <h3>Object Data</h3>
    <p id="obj-name">Name: </p>
    <p id="obj-x">X: </p>
    <p id="obj-y">Y: </p>
    <p id="obj-scripts">Scripts: </p>
  `;
  document.body.appendChild(rightTab);
}

// Create bottom bar for displaying object folders and other stuff
function createBottomBar() {
  const bottomBar = document.createElement('div');
  bottomBar.id = 'bottom-bar';
  bottomBar.innerHTML = `
    <h3>Object Folders</h3>
    <ul id="object-folder-list">
      <li>No objects loaded</li>
    </ul>
  `;
  document.body.appendChild(bottomBar);
}

// Create the main canvas area for the game screen
function createGameCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'game-canvas';
  document.body.appendChild(canvas);
  drawGUI(); // Call drawGUI to initialize rendering
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
    drawGUI();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createTopBar();
  createLeftTab();
  createRightTab();
  createBottomBar();
  createGameCanvas();
  loadStarterProject();
});
