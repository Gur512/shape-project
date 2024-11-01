'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

const shapeButton = select('.shapes');
const colorButton = select('.colors');
const infoDisplay = select('.message');
const shapeGrid = select('.shape-grid');
const createButton = select('.create-button');

const shapes = ["Circle", "Square"];
const colors = ["#09f", "#9f0", "#f90", "#f09", "#90f"];
let shapeIndex = 0;
let colorIndex = 0;
let shapeCount = 0;

const itemWidth = 80; 
const itemHeight = 80; 
const gridHeight = 350; 
const gridWidth = 520;

const maxItemsPerRow = Math.floor(gridWidth / itemWidth);
const maxRows = Math.floor(gridHeight / itemHeight);
const maxItems = maxItemsPerRow * maxRows; 

class Shape {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    getInfo() {
        return `${this.name.toLowerCase()} ${getColorName(this.color)}`;
    }
}

const shapesArray = [];


shapeButton.addEventListener("click", function () {
    shapeIndex = (shapeIndex + 1) % shapes.length;
    this.textContent = shapes[shapeIndex];
});

colorButton.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    this.textContent = getColorName(colors[colorIndex]);
});

function getColorName(hex) {
    if (hex === "#09f") return "Blue";
    if (hex === "#9f0") return "Green";
    if (hex === "#f90") return "Orange";
    if (hex === "#f09") return "Pink";
    if (hex === "#90f") return "Purple";
    return "Unknown";
}

function isGridFull() {
    if (shapesArray.length >= maxItems) {
        infoDisplay.textContent = "The Storage is full!";
        return true; 
    }
    return false;
}

function createDiv(shape, count) {
    const shapeDiv = document.createElement("div");
    shapeDiv.classList.add("shape", shape.name.toLowerCase());
    shapeDiv.style.backgroundColor = shape.color;

    shapeDiv.addEventListener("click", function () {
        infoDisplay.textContent = `Unit ${count}: ${shape.getInfo()}`;
    });

    return shapeDiv;
}

function createShape() {
    if (isGridFull()) {
        return;
    }

    const shapeType = shapes[shapeIndex];
    const color = colors[colorIndex];

    const shape = new Shape(shapeType, color);
    shapesArray.push(shape);
    shapeCount++;

    const shapeDiv = createDiv(shape, shapeCount);
    shapeGrid.appendChild(shapeDiv);

    infoDisplay.textContent = `Unit ${shapeCount}: ${shape.getInfo()}`;
}

createButton.addEventListener('click', createShape);
