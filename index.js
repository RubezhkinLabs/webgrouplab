document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  const [num1Input, operationInput, num2Input, resultInput, feedbackInput] =
    inputs;
  const generateButton = document.getElementById("generateButton");
  const okButton = document.getElementById("checkButton");
  const resetButton = document.getElementById("resetButton");
  const numberButtons = document.querySelectorAll(".numberButton");
  const numberSystem = document.getElementById("numberSystem");
  const maximumNumber = document.getElementById("maximumNumber");

  let num1, num2, answer, operation, numSys, maxNum;

  function updateNumberButtons() {
    numberButtons.forEach((button) => {
      const num = parseInt(button.textContent, 16);
      if (num < numSys) {
        button.style.display = "block"; // Показываем кнопку
      } else {
        button.style.display = "none"; // Скрываем кнопку
      }
    });
  }

  function generateProblem() {
    numSys = parseInt(numberSystem.value);
    maxNum = parseInt(maximumNumber.value);
    updateNumberButtons();
    console.log(numSys);
    num1 = Math.floor(Math.random() * maxNum);
    num2 = Math.floor(Math.random() * maxNum);
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
      let num = parseInt(button.textContent, 16);
      if (num < numSys) {
        resultInput.value += button.textContent;
      }
    });
  });

  generateButton.addEventListener("click", generateProblem);
  okButton.addEventListener("click", checkAnswer);
  resetButton.addEventListener("click", reset);

  updateNumberButtons(); // Обновляем кнопки при загрузке
  reset();
});
