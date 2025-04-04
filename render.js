// Variables to keep track of world offset and drag state
let worldOffsetX = 0; // X offset for scrolling
let worldOffsetY = 0; // Y offset for scrolling
let isDragging = false; // Flag for detecting if we're dragging the world
let dragStartX = 0; // Start X position of the drag
let dragStartY = 0; // Start Y position of the drag
let gameObjs = []; // Array of game objects (this will be populated later)
let gridVisible = true; // Flag to toggle the grid visibility

// Game object rendering function
function drawGameObjects(ctx) {
    for (let obj of gameObjs) {
        if (obj.loaded) {
            // Draw the image at the object's coordinates, adjusted for the world offset
            ctx.drawImage(obj.img, obj.x + worldOffsetX, obj.y + worldOffsetY, obj.width, obj.height);
        } else {
            // Fallback if image is not loaded
            ctx.fillStyle = 'gray';
            ctx.fillRect(obj.x + worldOffsetX, obj.y + worldOffsetY, obj.width, obj.height);
            ctx.fillStyle = 'white';
            ctx.fillText('Loading...', obj.x + worldOffsetX + 10, obj.y + worldOffsetY + 20);
        }
    }
}
// Draw grid
function drawGrid(ctx, canvas) {
    if (gridVisible) {
        ctx.strokeStyle = '#CCCCCC';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x - worldOffsetX, 0);
            ctx.lineTo(x - worldOffsetX, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y - worldOffsetY);
            ctx.lineTo(canvas.width, y - worldOffsetY);
            ctx.stroke();
        }
    }
}
// Function to draw the stage
function drawStage() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the grid and game objects
    drawGrid(ctx, canvas);
    drawGameObjects(ctx);
}

// Handle mouse drag to move the stage
function handleMouseDrag(e) {
    if (!isDragging) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update the world offsets based on the difference in mouse position
    worldOffsetX = mouseX - dragStartX + worldOffsetX;
    worldOffsetY = mouseY - dragStartY + worldOffsetY;

    dragStartX = mouseX;
    dragStartY = mouseY;

    drawStage();
}

// Start dragging the world
function startDragging(e) {
    isDragging = true;
    dragStartX = e.clientX + worldOffsetX;
    dragStartY = e.clientY + worldOffsetY;
    document.addEventListener('mousemove', handleMouseDrag);
}

// Stop dragging the world
function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseDrag);
}
// Create a new game object
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

// Initialize and set up the canvas for rendering
function createGameCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'game-canvas';
    canvas.width = window.innerWidth - 400; // Set canvas size (adjust as needed)
    canvas.height = window.innerHeight - 50; // Adjust height based on top panel
    canvas.addEventListener('mousedown', startDragging);
    canvas.addEventListener('mouseup', stopDragging);
    canvas.addEventListener('mouseleave', stopDragging);
    document.body.appendChild(canvas);

    drawStage(); // Initial stage draw
}

// Initializing the canvas and game objects
window.addEventListener('DOMContentLoaded', () => {
    createGameCanvas();
    
    // Example GameObject to test
    createGameObj('Player', 'editorIcons/image.png', 50, 50, 100, 100);
    createGameObj('Enemy', 'editorIcons/image.png', 200, 200, 100, 100);
});
