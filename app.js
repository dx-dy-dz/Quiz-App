const mainBox = document.querySelector('.home')
const qnBox = document.querySelector('.qn-box')
const resultBox = document.querySelector('.result-box')
const questionNumber = document.querySelector('.qn-no')
const questionText = document.querySelector('.qn-text')
const optionContainer = document.querySelector('.option-container')
const answersIndicatorContainer = document.querySelector('.ans-indicator')
 
let questionCounter = 0
let currentQuestion
let availableQuestions = []
let availableOptions = []
let correctAnswer = 0
let attemptedQns = 0

function setAvailableQuestions () {
  const totalQuestion = questions.length
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(questions[i])
  }
}

function getNewQuestion () {
  questionNumber.innerHTML =
    ' Question ' + (questionCounter + 1) + ' of ' + questions.length

  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  currentQuestion = questionIndex
  questionText.innerHTML = currentQuestion.question

  const index1 = availableQuestions.indexOf(questionIndex)
  availableQuestions.splice(index1, 1)

  const optionLen = currentQuestion.options.length

  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i)
  }
  optionContainer.innerHTML = ''
  let animationDelay = 0.15
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)]
    const index2 = availableOptions.indexOf(optionIndex)
    availableOptions.splice(index2, 1)

    const option = document.createElement('div')
    option.innerHTML = currentQuestion.options[optionIndex]
    option.id = optionIndex
    option.style.animationDelay = animationDelay + 's'
    animationDelay = animationDelay + 0.15
    option.className = 'option'
    optionContainer.appendChild(option)
    option.setAttribute('onclick', 'getResult(this)')
  }

  questionCounter = questionCounter + 1
}
function getResult (element) {
  const id = parseInt(element.id)
  if (id === currentQuestion.answer) {
    element.classList.add('correct')
    correctAnswer++
    console.log('correct: ' + correctAnswer)
  } else {
    element.classList.add('wrong')
    const optionLen = optionContainer.children.length
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add('correct')
      }
    }
  }
  attemptedQns++
  unclickable()
}
function unclickable () {
  const optionLen = optionContainer.children.length
  for (i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add('already-answered')
  }
}
function next () {
  if (questionCounter == questions.length) {
    console.log('Quiz is over')
    stopQuiz()
  } else {
    getNewQuestion()
  }
}
function stopQuiz () {
  qnBox.classList.add('hide')
  resultBox.classList.remove('hide')
  showResult()
}
function showResult () {
  resultBox.querySelector('.total-qn').innerHTML = questions.length
  resultBox.querySelector('.atmpt-qn').innerHTML = attemptedQns
  resultBox.querySelector('.rght-qn').innerHTML = correctAnswer
  resultBox.querySelector('.wrng-qn').innerHTML = attemptedQns - correctAnswer
  const percentage = (correctAnswer / questions.length) * 100
  resultBox.querySelector('.perc-qn').innerHTML = percentage.toFixed(2) + '%'
  resultBox.querySelector('.total-score').innerHTML =
    correctAnswer + ' / ' + questions.length
}
function answersIndicator () {
  const totalQuestion = questions.length
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement('div')
    answersIndicatorContainer.appendChild(indicator)
  }
}
function reset () {
  questionCounter = 0
  correctAnswer = 0
  attemptedQns = 0
}
function tryAgain () {
  resultBox.classList.add('hide')
  qnBox.classList.remove('hide')
  reset()
  startQuiz()
}
function goHome () {
  resultBox.classList.add('hide')
  mainBox.classList.remove('hide')
  reset()
}
function startQuiz () {
  mainBox.classList.add('hide')
  qnBox.classList.remove('hide')
  setAvailableQuestions()
  getNewQuestion()
  answersIndicator()
}
