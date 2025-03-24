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
  const historyTable = document.getElementById("historyTable"); // Таблица для истории
  const clearHistory = document.getElementById("clearHistory");

  let num1, num2, answer, operation, numSys, maxNum;
  let history = []; // Массив для хранения истории

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

    // Сохраняем результат в localStorage
    const result = {
      numSys: numSys,
      num1: num1.toString(numSys),
      operation: operation,
      num2: num2.toString(numSys),
      userAnswer: resultInput.value,
      correctAnswer: answer.toString(numSys),
      feedback: feedbackInput.value,
    };

    history.push(result);
    localStorage.setItem("history", JSON.stringify(history));
    updateHistoryTable();
  }

  function reset() {
    resultInput.value = "";
    feedbackInput.value = "";
  }

  function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem("history"));
    if (savedHistory) {
      history = savedHistory;
      updateHistoryTable();
    }
  }

  function updateHistoryTable() {
    historyTable.innerHTML = ""; // Очищаем таблицу
    history.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.numSys}</td>
        <td>${entry.num1}</td>
        <td>${entry.operation}</td>
        <td>${entry.num2}</td>
        <td>${entry.userAnswer}</td>
        <td>${entry.correctAnswer}</td>
        <td>${entry.feedback}</td>
      `;
      historyTable.appendChild(row);
    });
  }

  function clear() {
    localStorage.clear();
    history = [];
    updateHistoryTable();
  }

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resultInput.value += button.textContent;
    });
  });

  numberSystem.addEventListener("change", updateNumberButtons);
  generateButton.addEventListener("click", generateProblem);
  okButton.addEventListener("click", checkAnswer);
  resetButton.addEventListener("click", reset);
  clearHistory.addEventListener("click", clear);

  updateNumberButtons(); // Обновляем кнопки при загрузке
  loadHistory(); // Загружаем историю из localStorage
  reset();
});
