const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expression");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let firstOperand = null;
let operator = null;

// Update displays
function updateDisplay() {
  display.value = currentInput || firstOperand || "0";
  expressionDisplay.textContent = firstOperand !== null ? 
      (operator ? `${firstOperand} ${operator} ${currentInput}` : firstOperand) 
      : "";
}

// Append number
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    updateDisplay();
  });
});

// Append decimal
decimalButton.addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    currentInput += currentInput ? "." : "0.";
    updateDisplay();
  }
});

// Set operator and allow chaining
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (currentInput === "" && firstOperand === null) return;

    if (firstOperand !== null && operator !== null && currentInput !== "") {
      // Calculate previous operation before chaining
      calculate();
    } else if (currentInput !== "") {
      firstOperand = parseFloat(currentInput);
    }

    operator = button.getAttribute("data-operator");
    currentInput = "";
    updateDisplay();
  });
});

// Calculate function
function calculate() {
  if (firstOperand === null || operator === null || currentInput === "") return;
  const secondOperand = parseFloat(currentInput);
  let result;
  switch (operator) {
    case '+': result = firstOperand + secondOperand; break;
    case '-': result = firstOperand - secondOperand; break;
    case '*': result = firstOperand * secondOperand; break;
    case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : "Error"; break;
  }
  firstOperand = result;
  currentInput = "";
  operator = null;
  updateDisplay();
}

// Equals button
equalsButton.addEventListener("click", () => {
  calculate();
  operator = null; // ready for new operation
});

// Clear button
clearButton.addEventListener("click", () => {
  currentInput = "";
  firstOperand = null;
  operator = null;
  updateDisplay();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) currentInput += e.key;
  else if (e.key === ".") {
    if (!currentInput.includes(".")) currentInput += currentInput ? "." : "0.";
  }
  else if (['+', '-', '*', '/'].includes(e.key)) {
    if (currentInput === "" && firstOperand === null) return;
    if (firstOperand !== null && operator !== null && currentInput !== "") calculate();
    else if (currentInput !== "") firstOperand = parseFloat(currentInput);
    operator = e.key;
    currentInput = "";
  }
  else if (e.key === "Enter") calculate();
  else if (e.key === "Backspace") currentInput = currentInput.slice(0, -1);
  else if (e.key.toLowerCase() === "c") clearButton.click();
  updateDisplay();
});
