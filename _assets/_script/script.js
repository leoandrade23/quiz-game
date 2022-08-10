const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion = () => {
  if (questions[currentQuestion]) {
    qS(".scoreArea").style.display = "none";
    qS(".questionArea").style.display = "block";

    let q = questions[currentQuestion];

    let percent = Math.round((currentQuestion / questions.length) * 100);
    qS(".progress--bar").style.width = `${percent}%`;

    qS("h1").innerHTML = `Questão <span>${currentQuestion + 1}</span>`;
    qS(".question").innerHTML = q.question;

    let optionsHtml = "";
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option">
      <span>${parseInt(i) + 1}</span>
      ${q.options[i]}</div>`;
    }
    optionsHtml = qS(".options").innerHTML = optionsHtml;

    qS(".currentScoreArea").style.display = "flex";
    qS(".currentScoreArea").innerHTML = `Pontuação: ${correctAnswers}`;

    qSAll(".option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
};

optionClickEvent = (e) => {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));
  let q = questions[currentQuestion];
  let correctAnswer = qS(`[data-op='${q.answer}'`);
  if (clickedOption === q.answer) {
    e.target.style.background = "green";
    correctAnswers++;
  } else {
    e.target.style.background = "red";
    correctAnswer.style.background = "green";
  }
  setTimeout(
    (nextQuestion = () => {
      currentQuestion++;
      qS(".currentScoreArea").innerHTML = `Pontuação: ${correctAnswers}`;
      showQuestion();
    }),
    1000
  );
};

finishQuiz = () => {
  qS(".questionArea").style.display = "none";
  qS(".scoreArea").style.display = "block";
  qS(".currentScoreArea").style.display = "none";

  qS(".progress--bar").style.width = `100%`;

  qS("h1").innerHTML = "Fim!";

  let totalPercent = Math.round((correctAnswers / questions.length) * 100);
  if (totalPercent < 30) {
    qS(".scoreText1").innerHTML = "Muito Mal!";
    qS(".scorePct").style.color = "red";
  } else if (totalPercent >= 30 && totalPercent < 70) {
    qS(".scoreText1").innerHTML = "Bom!";
    qS(".scorePct").style.color = "blue";
  } else if (totalPercent >= 70) {
    qS(".scoreText1").innerHTML = "Parabéns!";
    qS(".scorePct").style.color = "green";
  }
  qS(".scorePct").innerHTML = `Acertou ${totalPercent}%`;

  qS(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;
};

showQuestion();

resetEvent = () => {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
};

qS("button").addEventListener("click", resetEvent);
