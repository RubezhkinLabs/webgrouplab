document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  const [num1Input, operationInput, num2Input, resultInput, feedbackInput] =
    inputs;
  const generateButton = document.getElementById("generateButton");
  const okButton = document.getElementById("checkButton");
  const resetButton = document.getElementById("resetButton");
  const numberButtons = document.querySelectorAll(".numberButton");
  const numberSystem = document.getElementById("numberSystem");

  let num1, num2, answer, operation, numSys;

  function generateProblem() {
    numSys = parseInt(numberSystem.value);
    console.log(numSys);
    num1 = Math.floor(Math.random() * 256);
    num2 = Math.floor(Math.random() * 256);
    operation = Math.random() < 0.5 ? "+" : "-";
    if (operation === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    num1Input.value = num1.toString(numSys);
    operationInput.value = operation;
    num2Input.value = num2.toString(numSys);
    resultInput.value = "";
    feedbackInput.value = "";
  }

  function checkAnswer() {
    const userAnswer = parseInt(resultInput.value, numSys);
    if (operation === "+") {
      answer = num1 + num2;
    } else {
      answer = num1 - num2;
    }
    if (userAnswer === answer) {
      feedbackInput.value = "Correct!";
    } else {
      feedbackInput.value = "Not Correct!";
    }
  }

  function reset() {
    resultInput.value = "";
    feedbackInput.value = "";
  }

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let num = parseInt(button.textContent);
      if (num < numSys) {
        resultInput.value += button.textContent;
      }
    });
  });

  generateButton.addEventListener("click", generateProblem);
  okButton.addEventListener("click", checkAnswer);
  resetButton.addEventListener("click", reset);

  reset();
});
