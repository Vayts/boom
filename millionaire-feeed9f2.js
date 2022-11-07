(()=>{"use strict";var __webpack_modules__={879:()=>{eval("\n;// CONCATENATED MODULE: ./src/utils/js/utils.js\nfunction addListener(id, eventType, callback) {\n  var node = document.getElementById(id);\n  if (node) {\n    node.addEventListener(eventType, callback);\n    return true;\n  }\n  return false;\n}\nfunction getElement(id) {\n  var node = document.getElementById(id);\n  if (node) {\n    return node;\n  }\n  return false;\n}\nfunction getInputValue(id) {\n  var input = getElement(id);\n  if (input) {\n    return input.value;\n  }\n  return false;\n}\nfunction randomNumber(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nfunction getNodeList(className) {\n  var nodeList = document.querySelectorAll(className);\n  if (nodeList) {\n    return nodeList;\n  }\n  return false;\n}\nfunction addListListeners(className, eventType, callback) {\n  var nodeList = getNodeList(className);\n  if (nodeList) {\n    nodeList.forEach(function (item) {\n      item.addEventListener(eventType, callback);\n    });\n    return true;\n  }\n  return false;\n}\nfunction setDisabled(id) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.setAttribute('disabled', 'disabled');\n    return true;\n  }\n  return false;\n}\nfunction removeDisabled(id) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.removeAttribute('disabled');\n    return true;\n  }\n  return false;\n}\nfunction setTextContent(id, str) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.textContent = str;\n    return true;\n  }\n  return false;\n}\nfunction setActive(id) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.classList.add('active');\n    return true;\n  }\n  return false;\n}\nfunction removeActive(id) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.classList.remove('active');\n    return true;\n  }\n  return false;\n}\nfunction setDisplay(id, display) {\n  var elem = getElement(id);\n  if (elem) {\n    elem.style.display = display;\n    return true;\n  }\n  return false;\n}\nfunction randomNumberWithException(min, max, exception) {\n  var number = Math.floor(Math.random() * (max - min + 1)) + min;\n  if (number === exception) {\n    return randomNumberWithException(min, max, exception);\n  }\n  return number;\n}\n;// CONCATENATED MODULE: ./src/constants/prize.js\nvar PRIZE = [\"100\", \"200\", \"300\", \"500\", \"1000\", \"2000\", \"4000\", \"8000\", \"16000\", \"32000\", \"64000\", \"125000\", \"250000\", \"500000\", \"1000000\"];\n;// CONCATENATED MODULE: ./src/pages/Millionaire/logic/logic.js\n\n\nfunction startGame(state) {\n  state.init = true;\n  setDisplay('startGame', 'none');\n  setDisplay('gameWindow', 'block');\n  setDisplay('gameProgress', 'block');\n  setQuestion(state);\n  return state;\n}\nfunction setQuestion(state) {\n  var answerButtons = getNodeList('.game__answer-button');\n  var answers = state.questions[state.questionNumber].answers.slice(0);\n  state.answers = state.questions[state.questionNumber].answers.slice(0);\n  setTextContent('hostText', state.questions[state.questionNumber].question);\n  answerButtons.forEach(function (item) {\n    var random = randomNumber(0, answers.length - 1);\n    item.value = answers[random];\n    item.textContent = answers[random];\n    answers.splice(random, 1);\n  });\n  return state;\n}\nfunction answerClick(state, e) {\n  if (state.init) {\n    checkAnswer(state, e.target);\n    removeDisabledAttributeAnswers(state);\n    return true;\n  }\n  return false;\n}\nfunction checkAnswer(state, target) {\n  if (state.questions[state.questionNumber].correct === target.value) {\n    correctAnswer(state, target);\n    state.prize = PRIZE[state.questionNumber];\n    answerDelay(state, target);\n    return true;\n  }\n  wrongAnswer(state, target);\n  looseGameDelay(state, target);\n}\nfunction answerDelay(state, target) {\n  setTimeout(function () {\n    resetColor(state, target);\n    state.questionNumber++;\n    if (!winGameCheck(state)) {\n      setQuestion(state);\n    } else {\n      winGame(state);\n    }\n  }, 700);\n  return state;\n}\nfunction looseGameDelay(state, target) {\n  setTimeout(function () {\n    resetColor(state, target);\n    looseGame(state);\n  }, 700);\n  return state;\n}\nfunction winGameCheck(state) {\n  if (state.questionNumber === 4) {\n    state.savePrize = 1000;\n  }\n  if (state.questionNumber === 9) {\n    state.savePrize = 32000;\n  }\n  if (state.questionNumber === 14) {\n    state.savePrize = 1000000;\n  }\n  return state.questionNumber === 15;\n}\nfunction winGame(state) {\n  setDisplay('gameHelp', 'none');\n  setDisplay('gameAnswers', 'none');\n  setDisplay('gameRestart', 'flex');\n  setTextContent('hostText', \"\\u0412\\u0438 \\u043F\\u0435\\u0440\\u0435\\u043C\\u043E\\u0433\\u043B\\u0438=) \\u0425\\u043E\\u0447\\u0435\\u0442\\u0435 \\u0441\\u043F\\u0440\\u043E\\u0431\\u0443\\u0432\\u0430\\u0442\\u0438 \\u0449\\u0435? \\u0412\\u0430\\u0448 \\u0432\\u0438\\u0433\\u0440\\u0430\\u0448 \\u0441\\u043A\\u043B\\u0430\\u0432 - \".concat(state.savePrize, \"$.\"));\n  return true;\n}\nfunction gameReset(state) {\n  setDisplay('gameHelp', 'flex');\n  setDisplay('gameAnswers', 'flex');\n  setDisplay('gameRestart', 'none');\n  removeDisabled('friendCall');\n  removeDisabled('fiftyPercent');\n  resetState(state);\n  setQuestion(state);\n  resetPrizeBar();\n  return state;\n}\nfunction resetState(state) {\n  state.questionNumber = 0;\n  state.prize = 0;\n  state.savePrize = 0;\n  state.friendCall = true;\n  state.fifty = true;\n  state.answers = [];\n  return state;\n}\nfunction resetPrizeBar() {\n  var progressbarLever = getNodeList('.game__progressbar-item');\n  progressbarLever.forEach(function (item) {\n    item.classList.remove('active');\n  });\n}\nfunction looseGame(state) {\n  setDisplay('gameHelp', 'none');\n  setDisplay('gameAnswers', 'none');\n  setDisplay('gameRestart', 'flex');\n  setTextContent('hostText', \"\\u041E \\u043D\\u0456! \\u0412\\u0438 \\u043F\\u0440\\u043E\\u0433\\u0440\\u0430\\u043B\\u0438=( \\u0425\\u043E\\u0447\\u0435\\u0442\\u0435 \\u0441\\u043F\\u0440\\u043E\\u0431\\u0443\\u0432\\u0430\\u0442\\u0438 \\u0449\\u0435? \\u0412\\u0430\\u0448 \\u0432\\u0438\\u0433\\u0440\\u0430\\u0448 \\u0441\\u043A\\u043B\\u0430\\u0432 - \".concat(state.savePrize, \"$.\"));\n  return false;\n}\nfunction correctAnswer(state, target) {\n  var progressbarLevel = getNodeList('.game__progressbar-item');\n  progressbarLevel[state.questionNumber].classList.add('active');\n  state.init = false;\n  target.style.backgroundColor = '#7abe54';\n  target.style.borderColor = '#7abe54';\n  target.style.color = '#fff';\n  return state;\n}\nfunction wrongAnswer(state, target) {\n  state.init = false;\n  target.style.backgroundColor = '#bd4545';\n  target.style.borderColor = '#bd4545';\n  target.style.color = '#fff';\n  return state;\n}\nfunction resetColor(state, target) {\n  state.init = true;\n  target.style.backgroundColor = '';\n  target.style.borderColor = '';\n  target.style.color = '';\n  return state;\n}\nfunction friendCall(state) {\n  if (state.friendCall) {\n    state.friendCall = false;\n    setDisabled('friendCall');\n    setActive('friend');\n    setTextContent('friendText', \"\\u042F \\u0433\\u0430\\u0434\\u0430\\u044E, \\u0449\\u043E \\u043F\\u0440\\u0430\\u0432\\u0438\\u043B\\u044C\\u043D\\u0430 \\u0432\\u0456\\u0434\\u043F\\u043E\\u0432\\u0456\\u0434\\u044C - \".concat(state.answers[randomNumber(0, state.answers.length - 1)]));\n    return true;\n  }\n  return false;\n}\nfunction fiftyPercent(state) {\n  if (state.fifty) {\n    state.fifty = false;\n    setDisabled('fiftyPercent');\n    var randomAnswers = [state.questions[state.questionNumber].correct];\n    var exceptionNumber = state.answers.indexOf(state.questions[state.questionNumber].correct);\n    randomAnswers.push(state.answers[randomNumberWithException(0, state.answers.length - 1, exceptionNumber)]);\n    removeWrongValueFromAnswers(state, randomAnswers);\n    disableAnswers(state);\n    return state;\n  }\n  return false;\n}\nfunction removeWrongValueFromAnswers(state, arr) {\n  var result = [];\n  state.answers.forEach(function (item) {\n    if (arr.includes(item)) {\n      result.push(item);\n    }\n  });\n  state.answers = result;\n  return state;\n}\nfunction disableAnswers(state) {\n  var nodeList = getNodeList('.game__answer-button');\n  nodeList.forEach(function (item) {\n    if (!state.answers.includes(item.value)) {\n      item.setAttribute('disabled', 'disabled');\n    }\n  });\n  return true;\n}\nfunction removeDisabledAttributeAnswers(state) {\n  if (!state.fifty) {\n    var nodeList = getNodeList('.game__answer-button');\n    nodeList.forEach(function (item) {\n      item.removeAttribute('disabled');\n    });\n    return true;\n  }\n  return false;\n}\n;// CONCATENATED MODULE: ./src/constants/questions.js\nvar QUESTIONS = [{\n  question: 'Бог придумав цапа, а чорт...?',\n  answers: ['Цаплю', 'Кацапа!', 'Горілку', 'Фізику'],\n  correct: 'Кацапа!'\n}, {\n  question: 'Столиця України?',\n  answers: ['Лондон', 'Дрогобич', 'Київ!', 'Горлівка'],\n  correct: 'Київ!'\n}, {\n  question: 'Кавун - це...?',\n  answers: ['База!', 'Фрукт', 'Ягода', 'Овоч'],\n  correct: 'База!'\n}, {\n  question: 'Астанавітєс - відома цитата...?',\n  answers: ['Янукович В.Ф.!', 'Зеленський В.О.', 'Порошенко П.О.', 'Шевченко О.Т.'],\n  correct: 'Янукович В.Ф.!'\n}, {\n  question: 'Хто розмінував Чонгар?',\n  answers: ['Він', 'Той самий', 'Оцей', 'Хз!'],\n  correct: 'Хз!'\n}, {\n  question: 'Рік підписання Люблінської унії',\n  answers: ['1322', '1991', '1569!', '1422'],\n  correct: '1569!'\n}, {\n  question: 'Рідина яку використовують у ядерній енергетиці та без якої неможливо існування людини',\n  answers: ['Вода!', 'Бортоломід', 'Зорулин', 'Крозутан'],\n  correct: 'Вода!'\n}, {\n  question: 'Хто є автором твору \"Гармидер у школі\"',\n  answers: ['Джеремі Стронг!', 'Роальд Дал', 'Едгар По', 'Порошенко Петро'],\n  correct: 'Джеремі Стронг!'\n}, {\n  question: 'Перший президент України',\n  answers: ['Янукович В.Ф.', 'Зеленський В.О.', 'Порошенко П.О.', 'Кравчук Л.М.!'],\n  correct: 'Кравчук Л.М.!'\n}, {\n  question: 'День взяття Бастилії',\n  answers: ['14 липня!', '18 серпня', '4 травня', '1 січня'],\n  correct: '14 липня!'\n}, {\n  question: '\"Слава Ісу\" - як прийнято відповідати на це привітання на сході Галичини?',\n  answers: ['Слава навіки Богу!', 'Героям Слава', 'І вам', 'Хай живе Святий'],\n  correct: 'Слава навіки Богу!'\n}, {\n  question: 'Рік створення Української повстанської армії?',\n  answers: ['1944', '1996', '1942!', '1933'],\n  correct: '1942!'\n}, {\n  question: 'Перша українська НЕЗАЛЕЖНА держава була проголошена ... універсалом',\n  answers: ['I', 'II', 'IV!', 'III'],\n  correct: 'IV!'\n}, {\n  question: 'Скільки країн входить до ЄС?',\n  answers: ['22', '14', '31', '27!'],\n  correct: '27!'\n}, {\n  question: 'Як довго тривала 100-річна війна?',\n  answers: ['117', '116!', '100', '99'],\n  correct: '116!'\n}];\n;// CONCATENATED MODULE: ./src/pages/Millionaire/index.js\n\n\n\n\nfunction initMillionaire() {\n  var state = {\n    init: false,\n    questions: QUESTIONS.slice(0),\n    prize: 0,\n    answers: [],\n    friendCall: true,\n    fifty: true,\n    savePrize: 0,\n    questionNumber: 0\n  };\n  addListener('startGame', 'click', startGame.bind(null, state));\n  addListener('resetGame', 'click', gameReset.bind(null, state));\n  addListener('friendCall', 'click', friendCall.bind(null, state));\n  addListener('fiftyPercent', 'click', fiftyPercent.bind(null, state));\n  addListener('friendOkButton', 'click', removeActive.bind(null, 'friend'));\n  addListListeners('.game__answer-button', 'click', answerClick.bind(null, state));\n}\ninitMillionaire();\n\n//# sourceURL=webpack://web/./src/pages/Millionaire/index.js_+_4_modules?")}},__webpack_exports__={};__webpack_modules__[879]()})();