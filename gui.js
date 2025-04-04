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
  drawGUI();
}

// Draw the game scene and game objects
function drawGUI() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid if visible
  if (gridVisible) {
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Draw gameObjs (sprites)
  for (let obj of gameObjs) {
    if (obj.loaded) {
      ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    } else {
      ctx.fillStyle = 'gray';
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      ctx.fillStyle = 'white';
      ctx.fillText('Loading...', obj.x + 10, obj.y + 20);
    }
  }

  requestAnimationFrame(drawGUI);
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
        <a href="#" onclick="closeOptions()">Close</a>
      </div>
    </div>
  `;
  document.body.prepend(topBar);
}

// Close the options dropdown
function closeOptions() {
  // Logic to close dropdown or menu
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
  drawGUI();
}

// Load a starter project with "assets" folder
function loadStarterProject() {
  if (!projectLoaded) {
    // Create assets folder and load it
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

// Initialize GUI (Top bar, side tabs, bottom bar, game canvas)
window.addEventListener('DOMContentLoaded', () => {
  createTopBar();
  createLeftTab();
  createRightTab();
  createBottomBar();
  createGameCanvas();
  loadStarterProject();
});
