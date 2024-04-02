function add(a,b) {a + b};
function subtract(a,b) {a - b};
function multiply(a,b) {a * b};
function divide (a,b) {a / b};

let var1 = 0;
let var2 = 0;
let operator;

function operate(op,var1,var2) {
    if (op == '+') add(var1,var2);
    if (op == '-') subtract(var1,var2);
    if (op == '*') multiply(var1,var2);
    if (op == '/') divide(var1,var2);
}

function display() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => { 
        button.addEventListener('click',(e) => {
            const newDisplay = document.querySelector(".display");
            if (newDisplay) {
                newDisplay.textContent = e.target.textContent;
            }
        });
    });
}
display();