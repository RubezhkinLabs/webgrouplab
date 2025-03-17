document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  const [num1Input, operationInput, num2Input, resultInput, feedbackInput] =
    inputs;
  const generateButton = document.getElementById("generateButton");
  const okButton = document.getElementById("okButton");
  const resetButton = document.getElementById("resetButton");
  const numberButtons = document.querySelectorAll(".numberButton");

  let num1, num2, answer, operation;

  function generateProblem() {
    num1 = Math.floor(Math.random() * 64);
    num2 = Math.floor(Math.random() * 64);
    operation = Math.random() < 0.5 ? "+" : "-";
    if (operation === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    num1Input.value = num1.toString(8);
    operationInput.value = operation;
    num2Input.value = num2.toString(8);
    resultInput.value = "";
    feedbackInput.value = "";
  }

  function checkAnswer() {
    const userAnswer = parseInt(resultInput.value, 8);
    if (operation === "+") {
      answer = num1 + num2;
    } else {
      answer = num1 - num2;
    }
    if (userAnswer === answer) {
      feedbackInput.value = "Верно";
    } else {
      feedbackInput.value = "Неверно";
    }
  }

  function reset() {
    resultInput.value = "";
    feedbackInput.value = "";
  }

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resultInput.value += button.textContent;
    });
  });

  generateButton.addEventListener("click", generateProblem);
  okButton.addEventListener("click", checkAnswer);
  resetButton.addEventListener("click", reset);

  reset();
});
