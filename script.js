// Get all the buttons, operators, and numbers
const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".numbers");
const clear = document.getElementById("clearButton");
const display = document.getElementById("display");
const dotButton = document.getElementById("dot");
const plusminus = document.getElementById("plusorminus");

// Initialize variables to store the operator and the two values
let value1 = "";
let operator = null;
let value2 = "";
let resultDisplayed = false;

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    number.classList.add("clicked");
    if (resultDisplayed) {
      value1 = "";
      value2 = "";
      operator = null;
      resultDisplayed = false;
    }

    if (operator === null) {
      value1 += event.target.textContent;
      console.log(value1);
      updateDisplay(value1);
    } else {
      value2 += event.target.textContent;
      console.log(value2);
      updateDisplay(value1 + " " + operator + " " + value2);
    }
    setTimeout(() => {
      number.classList.remove("clicked");
    }, 100);
  });
});

plusminus.addEventListener("click", () => {
  plusminus.classList.add("clicked");

  if (operator === null) {
    value1 = -1 * parseFloat(value1).toString();
    updateDisplay(value1);
  } else {
    value2 = -1 * parseFloat(value2).toString();
    updateDisplay(value1 + " " + operator + " " + value2);
  }
  setTimeout(() => {
    plusminus.classList.remove("clicked");
  }, 100);
});

dotButton.addEventListener("click", () => {
  dotButton.classList.add("clicked");
  if (operator === null && !value1.includes(".")) {
    value1 += ".";
    updateDisplay(value1);
  } else if (operator && !value2.includes(".")) {
    value2 += ".";
    updateDisplay(value1 + " " + operator + " " + value2);
  }
  setTimeout(() => {
    dotButton.classList.remove("clicked");
  }, 100);
});

// Event listener for operator buttons to capture the operator

operators.forEach((op) => {
  op.addEventListener("click", (event) => {
    op.classList.add("clicked");

    if (!resultDisplayed || value1 !== "") {
      // Store the selected operator
      operator = event.target.textContent.trim();
      console.log(operator);
      updateDisplay(value1 + " " + operator);
    }
    setTimeout(() => {
      op.classList.remove("clicked");
    }, 100);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (["+", "-", "/", "%", "*"].includes(key)) {
    if (!resultDisplayed || value1 !== "") {
      operator = key;
      updateDisplay(value1 + " " + operator);
    }
  } else if (key >= "0" && key <= "9") {
    if (operator === null) {
      value1 += key;
      updateDisplay(value1);
    } else {
      value2 += key;
      updateDisplay(value1 + " " + operator + " " + value2);
    }
  } else if (key === "Enter") {
    if (value1 && operator && value2) {
      calculate();
    }
  }
});

// Calculator operation

function calculate() {
  let result;
  const num1 = parseFloat(value1);
  const num2 = parseFloat(value2);
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
    default:
      result = "Error" + operator;
  }
  console.log("Result calculated:", result);
  updateDisplay(result);
  value1 = result;
  value2 = "";
}

// Event listener for the equals button to perform the calculation
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
  equalsButton.classList.add("clicked");

  // Perform the calculation based on the operator
  if (value1 && operator && value2) {
    calculate();
  }
  setInterval(() => {
    equalsButton.classList.remove("clicked");
  }, 100);
});

// Event listener for the clear button to reset the calculator
clear.addEventListener("click", () => {
  clear.classList.add("clicked");
  resetCalculator();
  setTimeout(() => {
    clear.classList.remove("clicked");
  }, 100);
});

function resetCalculator() {
  operator = null;
  value1 = "";
  value2 = "";
  updateDisplay("");
  resultDisplayed = false;
}

// Function to update the display with the provided content
function updateDisplay(content) {
  display.textContent = content;
}
