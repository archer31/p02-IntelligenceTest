/*logic.js*/
/*Alexander Corley*/

/**
 * load all questions
**/
function loadQuestions() {
  answerGenerator[tests[currentTest]]("question1");
  answerGenerator[tests[currentTest]]("question2");
  answerGenerator[tests[currentTest]]("question3");
  answerGenerator[tests[currentTest]]("question4");
  answerGenerator[tests[currentTest]]("question5");
  answerGenerator[tests[currentTest]]("question6");
}

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
 * tests have the same name as their associated pages. just concat ".html" on the end to access the page
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
  C = toText(A).length + toText(B).length;
  if (ID == "question6") {
    para.innerHTML = "<span>".concat(A, ",", B, "->???</span>");
    correctAnswers[tests[currentTest]] = C;
  } else {
    para.innerHTML = A.toString().concat(",", B, "->", C);
  }
}

answerGenerator[tests[1]] = function(ID) {
  var para = document.getElementById(ID);
  var A, B, C;
  A = Math.floor(Math.random()*21);
  B = Math.floor(Math.random()*21);
  C = (toText(A).length * A) + (toText(B).length * B);
  if (ID == "question6") {
    para.innerHTML = "<span>".concat(A, ",", B, "->???</span>");
    correctAnswers[tests[currentTest]] = C;
  } else {
    para.innerHTML = A.toString().concat(",", B, "->", C);
  }
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
//  shuffle(tests);
  console.log("shuffle is commented");
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
  if (correctAnswers[tests[currentTest]] == inputValue) {
    points++;
  } else if (inputValue == "") {
    window.alert("you have not entered an answer yet.\nare you sure you want to move on?")
  }
  loadQuestions();
  resetInput();
}