let radio;
let submitButton;
let resultP;
let questionP;
let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let inputBox;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#d4a373"); // 修改背景顏色

  // 題目
  questionP = createP('');
  questionP.position(windowWidth / 2 - 100, windowHeight / 2 - 100);
  questionP.style('font-size', '30px');

  // 選項
  radio = createRadio();
  radio.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  radio.style('font-size', '30px');

  // 填空題輸入框
  inputBox = createInput();
  inputBox.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  inputBox.style('font-size', '30px');
  inputBox.hide();

  // 送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 20);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  // 結果顯示
  resultP = createP('');
  resultP.position(windowWidth / 2 - 100, windowHeight / 2 + 50);
  resultP.style('font-size', '30px');

  loadQuestion();
}

function draw() {
  background("#d4a373"); // 修改背景顏色
  textSize(25);
  textStyle(BOLD); // 設定字體為粗體
  text('答對題數: ' + correctCount, 10, 30);
  text('答錯題數: ' + incorrectCount, 10, 70);  
  text("413730697 廖政瑜", 10, 110);
}

function loadQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    questionP.html(row.get('question'));
    let type = row.get('type');

    if (type === 'multiple-choice') {
      radio.show();
      inputBox.hide();
      radio.elt.innerHTML = ''; // 清空選項
      radio.option(row.get('option1'));
      radio.option(row.get('option2'));
      radio.option(row.get('option3'));
      radio.option(row.get('option4'));
    } else if (type === 'fill-in-the-blank') {
      radio.hide();
      inputBox.show();
      inputBox.value('');
    }
  } else {
    questionP.html('測驗結束😁');
    radio.hide();
    inputBox.hide();
    submitButton.hide();
    resultP.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  }
}

function checkAnswer() {
  let row = table.getRow(currentQuestionIndex);
  let type = row.get('type');
  let answer;
  let correctAnswer = table.getString(currentQuestionIndex, 'answer');

  if (type === 'multiple-choice') {
    answer = radio.value();
  } else if (type === 'fill-in-the-blank') {
    answer = inputBox.value();
  }

  if (answer === correctAnswer) {
    correctCount++;
    resultP.style('color', "#1b98e0");
    resultP.html('恭喜答對了👏！');
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000); // 延遲1秒
  } else {
    incorrectCount++;
    resultP.style('color', "#da627d");
    resultP.html('答錯了喔，再一次😨');
  }
}