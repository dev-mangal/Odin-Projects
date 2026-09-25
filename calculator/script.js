const buttonContainer = document.querySelector(".buttonContainer");
const buttonData = [
    ["7", "number"],
    ["8", "number"],
    ["9", "number"],
    ["/", "operator"],

    ["4", "number"],
    ["5", "number"],
    ["6", "number"],
    ["*", "operator"],

    ["1", "number"],
    ["2", "number"],
    ["3", "number"],
    ["-", "operator"],

    ["0", "number"],
    [".", "decimal"],
    ["=", "equals"],
    ["+", "operator"]
];
const clear = document.querySelector(".clear");
const display = document.querySelector(".display");
const backspace = document.querySelector(".backspace");
const error = document.querySelector(".error");

buttonData.forEach(([value, type]) => {
    const button = document.createElement("button");
    button.textContent = value;
    button.classList.add(type);
    buttonContainer.appendChild(button);
});

const buttons = buttonContainer.querySelectorAll("button"); //nodelist of all buttons inside container

function add(num1, num2) {
    return num1 + num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if(num2 === 0){
        error.textContent = "Error, cannot divide by zero.";
        reset();
        return;
    }
    return num1 / num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

let num1 = ""; //initially a string, we convert to number later when we operate
let num2 = "";
let operator = "";
let enterNum1 = true; //boolean to check if number goes into num1 or 2
let selectedOp = null;
let justCalculated = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            //if equals pressed and then number is input, then start a new calculation
            error.textContent = "";
            if(justCalculated){
                num1 = "";
                num2 = "";
                operator = "";
                enterNum1 = true;
                justCalculated = false;
            }
            if (enterNum1) {
                num1 += button.textContent;
                display.textContent = num1;
            }
            else {
                num2 += button.textContent;
                display.textContent = num2;

                if(selectedOp){
                    selectedOp.classList.remove("selected");
                    selectedOp = null;
                }
            }
        }
        else if (button.classList.contains("operator")) {
            if(operator !== "" && num2 !== "") {
                num1 = Number(operate(Number(num1), operator, Number(num2)).toFixed(10));
                num2 = "";
                display.textContent = num1;
            }
            if(selectedOp){
                selectedOp.classList.remove("selected");
            }
            selectedOp = button;
            selectedOp.classList.add("selected");

            operator = button.textContent;
            enterNum1 = false;
            justCalculated = false;
        }
        else if(button.classList.contains("equals")) {
            //if no num2 provided like 12 += , then store 12, and wait for an operator
            if(num2 === ""){
                display.textContent = num1;
                operator = "";
                if(selectedOp){
                    selectedOp.classList.remove("selected");
                    selectedOp = null;
                }
                enterNum1 = true;
            }
            else{
                num1 = Number(operate(Number(num1), operator, Number(num2)).toFixed(10));
                display.textContent = num1;
                num2 = "";
                justCalculated = true;
            }
        }
        else if(button.classList.contains("decimal")){
            if(enterNum1 && !num1.includes(".")){
                num1 += ".";
                display.textContent = num1;
            }
            else if(!enterNum1 && !num2.includes(".")){
                num2 += ".";
                display.textContent = num2;
            }
        }
    });
});

function reset(){
    num1 = "";
    num2 = "";
    operator = "";
    enterNum1 = true;
    display.textContent = "";
    if(selectedOp){
        selectedOp.classList.remove("selected");
        selectedOp = null;        
    }
}

clear.addEventListener("click", reset);

backspace.addEventListener("click", () => {
    if (enterNum1) {
        num1 = num1.slice(0, -1);
        display.textContent = num1;
    } 
    else {
        num2 = num2.slice(0, -1);
        display.textContent = num2;
    }
});

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '*':
            return mult(num1, num2);
        case '/':
            return divide(num1, num2);
        case '-':
            return sub(num1, num2);
        default:
            break;
    }
}