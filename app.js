// finds the buttons to change the line width
const sButton = document.querySelector("#smallFont");
const mButton = document.querySelector("#mediumFont");
const lButton = document.querySelector("#largeFont");

// finds the text that shows the current line width
const fontSizeText = document.querySelector("#printFontSize");

// finds the main drawing board
let pan = document.querySelector("#drawingBoard");

// finds the initial line width class
let classType = "dot";

// change the line width class when click the buttons
sButton.addEventListener("click", function(){
    classType = "dot";
    fontSizeText.innerHTML = "Current Line Width: Small";
})

mButton.addEventListener("click", function(){
    classType = "mediumDot";
    fontSizeText.innerHTML = "Current Line Width: Medium";
})

lButton.addEventListener("click", function(){
    classType = "largeDot";
    fontSizeText.innerHTML = "Current Line Width: Large";
})

// add the changing color boolean
let changedColor = false;

// finds the color picker
let colorpicker = document.querySelector("#color");

// make the default color black
let currentColor = "black";

colorpicker.addEventListener("change", function(e){
    changedColor = true;
})

// callback function that creats divs (dots)
let addDots = function (e) {
    let x = e.pageX;
    let y = e.pageY;
    let createDot = document.createElement("div");
    createDot.style.position = "absolute";
    createDot.style.top = `${y}px`;
    createDot.style.left = `${x}px`;
    // add an empty class so we can find all dots and easy to clear them.
    createDot.classList.add("placehold");
    // add the class for different line width
    createDot.classList.add(classType);

    // if detects changing color, set the current color to the changed color
    if(changedColor){
        currentColor = `${colorpicker.value}`;
        changedColor = false;
    }
    createDot.style.backgroundColor = currentColor;

    pan.appendChild(createDot);
}

// when we click the drawing board, it will add the drawing.
pan.addEventListener("click", addDots);

// add the condition functions
// when mouse is clicked down, we can start adding the drawing
// when mouse is released, we can stop the drawing
let draw = function(){
    pan.addEventListener("mousemove", addDots);
}

let removeDraw = function(){
    pan.removeEventListener("mousemove", addDots);
}

pan.addEventListener("mousedown",draw);
document.body.addEventListener("mouseup",removeDraw);

// add condition functions for mobile device
let drawMobile = function(){
    pan.addEventListener("touchmove", addDots);
}

let removeDrawMobile = function(){
    pan.removeEventListener("touchmove", addDots);
}

pan.addEventListener("touchstart",drawMobile);
document.body.addEventListener("touchend",removeDrawMobile);

// reset button
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function(){
    let allElement = document.querySelectorAll(".placehold");
    for(let each of allElement){
        each.remove();
    }
});