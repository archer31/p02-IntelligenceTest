/*logic.js*/
/*Alexander Corley*/

/**
 * load all questions
**/
function loadQuestions() {
  if (!shuffled) {
    shuffle(tests);
    shuffled = true;
  }
  answerGenerator[tests[currentTest]]("question1");
  answerGenerator[tests[currentTest]]("question2");
  answerGenerator[tests[currentTest]]("question3");
  answerGenerator[tests[currentTest]]("question4");
  answerGenerator[tests[currentTest]]("question5");
  answerGenerator[tests[currentTest]]("question6");
}

/**
 * load the points into the results page
 */
function loadResults() {
  var score = document.getElementById("results");
  var motiv = document.getElementById("motivation");
  score.innerHTML = getCookie("points") + "/3";
  switch (score) {
    case 0: motiv.innerHTML = "God Damn!!!";
    case 1: motiv.innerHTML = "Damn";
    case 2: motiv.innerHTML = "OK";
    case 3: motiv.innerHTML = "Good Job";
  }
}

//have the tests been shuffled
var shuffled = false;

/**
 * reset the input fields
**/
function resetInput() {
  var inputField = document.getElementById("input");
  inputField.value = "";
  check();
  var giveUpButton = document.getElementById("GiveUp");
  giveUpButton.setAttribute("disabled", "");
}

/**
 * I use this structure in order to add more tests and choose from the pool randomly
**/
var tests = [
  "test1",
  "test2",
  "test3",
  "test4"
];

/**
 * store the functions to generate answers and examples for the tests
 * every function should have the param ID, which specifies the paragraph tag id to put the question in
**/
var answerGenerator = {};
answerGenerator[tests[0]] = function(ID) {
  var para = document.getElementById(ID);
  var A, B, C;
  A = Math.floor(Math.random()*10);
  B = Math.floor(Math.random()*10);
  C = (toText(A).length + toText(B).length).toString();
  setAnswers(ID, A, B, C);
}
answerGenerator[tests[1]] = function(ID) {
  var A, B, C;
  A = Math.floor(Math.random()*21);
  B = Math.floor(Math.random()*21);
  C = ((toText(A).length * A) + (toText(B).length * B)).toString();
  setAnswers(ID, A, B, C);
}
answerGenerator[tests[2]] = function(ID) {
  var A, B, C;
  A = Math.floor(Math.random()*10)+1;
  B = Math.floor(Math.random()*10)+1;
  var max = Math.max(A,B);
  var min = Math.min(A,B);
  A = max; B = min;
  C = (A+B).toString().concat((A*B), (A-B), (A%B));
  setAnswers(ID, A, B, C);
}
answerGenerator[tests[3]] = function(ID) {
  var A, B, C;
  A = Math.floor(Math.random()*100)+1;
  B = Math.floor(Math.random()*100)+1;
  C = (B%A).toString();
  setAnswers(ID, A, B, C);
}

//utility functions for generating questions and answers
function toText(num) {
  switch (num) {
    case 0:   return "zero";
    case 1:   return "one";
    case 2:   return "two";
    case 3:   return "three";
    case 4:   return "four";
    case 5:   return "five";
    case 6:   return "six";
    case 7:   return "seven";
    case 8:   return "eight";
    case 9:   return "nine";
    case 10:  return "ten";
    case 11:  return "eleven";
    case 12:  return "twelve";
    case 13:  return "thirteen";
    case 14:  return "fourteen";
    case 15:  return "fifteen";
    case 16:  return "sixteen";
    case 17:  return "seventeen";
    case 18:  return "eighteen";
    case 19:  return "nineteen";
    case 20:  return "twenty";
    default:  return "";
  }
}
function setAnswers(ID, A, B, C) {
  var para = document.getElementById(ID);
  if (ID == "question6") {
    para.innerHTML = "<span>".concat(A, ",", B, "->???</span>");
    correctAnswers[tests[currentTest]] = C;
  } else {
    para.innerHTML = A.toString().concat(",", B, "->", C);
  }
}

/**
 * I dont know that the answers are yet but i will know once i actually make the tests
 * correctAnswers[tests[0]] has the answer for tests[0] i dont know if this sort of hash table works but i think it does.
 * since we are storing the answers as strings then we can have both string answers and number answers
**/
var correctAnswers = {};

//the current test that the user is taking
var currentTest = 0;

//counts the correct answers that the user has entered
var points = 0;

/**
 * Shuffles array in place.
 * @param {Array} The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/**
 * choose three random tests from the list above and store them for later use
**/
function start() {
  window.location = "test.html";
}

/**
 * check the input test for correctness
**/
function check() {
  var giveUpButton = document.getElementById("GiveUp");
  var submitButton = document.getElementById("Submit");
  var inputField = document.getElementById("input");
  var inputValue = inputField.value;
  var inputMessage = document.getElementById("inputmessage");
  if (correctAnswers[tests[currentTest]] == inputValue) {
    giveUpButton.setAttribute("disabled", "");
    submitButton.removeAttribute("disabled");
    inputField.classList.remove("incorrect");
    inputField.classList.add("correct");
    inputMessage.innerHTML = "Good job. That is the right answer."
  } else {
    submitButton.setAttribute("disabled", "");
    giveUpButton.removeAttribute("disabled");
    inputField.classList.remove("correct");
    inputField.classList.add("incorrect");
    inputMessage.innerHTML = "That isn't the correct answer.";
    if (inputValue == "") {
      inputMessage.innerHTML = "<br>";
      inputField.classList.remove("incorrect");
    }
  }
}

/**
 * move to the next test page
**/
function nextPage() {
  currentTest++;
  var inputValue = document.getElementById("input").value;
  if (correctAnswers[tests[currentTest-1]] == inputValue) {
    points++;
  } else if (inputValue == "") {
    window.alert("you have not entered an answer yet.\nare you sure you want to move on?")
  }
  if (currentTest == 3) {
    setCookie("points", points, 1);
    console.log(document.cookie);
    window.location = "results.html";
  }
  loadQuestions();
  resetInput();
}

//taken from W3Schools
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//taken from W3Schools
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
