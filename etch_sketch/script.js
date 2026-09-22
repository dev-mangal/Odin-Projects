const body = document.querySelector("body");
const container = document.querySelector("#container");
let size = 12;
const reset = document.querySelector(".reset");
const generate = document.querySelector(".generate");
const input = document.querySelector("input");
const error = document.querySelector(".error");

function createGrid(){
    for(let i = 0; i < size * size; i++){
        const square = document.createElement("div");
        const squareSize = container.clientWidth / size;
        square.classList.add("square");
        // const r = Math.floor(Math.random() * 256);
        // const g = Math.floor(Math.random() * 256);
        // const b = Math.floor(Math.random() * 256);
        // square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        container.appendChild(square);
    }
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("mouseenter", () => {
            if(!square.dataset.hovered){
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                square.dataset.hovered = "true";
                square.style.opacity = 0.4;
            }
            else{
                let opacity = parseFloat(square.style.opacity);
                opacity = Math.min(opacity + 0.1, 1);
                square.style.opacity = opacity;
            }
        });
    });
}

createGrid();

reset.addEventListener("click", () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.backgroundColor = "rgb(255,255,255)";
        square.style.opacity = "1";
        delete square.dataset.hovered;
    });
});

generate.addEventListener("click", () => {
    size = Number(input.value);
    if(size > 100){
        error.textContent = "error. select a value within 1 to 100";
        return;
    }
    error.textContent = "";
    container.innerHTML = "";
    createGrid();
});