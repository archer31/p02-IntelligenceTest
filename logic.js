/*logic.js*/
/*Alexander Corley*/

/**
 * I use this structure in order to add more tests and choose from the pool randomly
 * tests have the same name as their associated pages. just concat ".html" on the end to access the page
**/
var tests = [
  "test1",
  "test2",
  "test3",
  "test4",
  "test5"
];

/**
 * I dont know that the answers are yet but i will know once i actually make the tests
 * correctAnswers[tests[0]] has the answer for tests[0] i dont know if this sort of hash table works but i think it does.
 * since we are storing the answers as strings then we can have both string answers and number answers
**/
var correctAnswers = {}

/**
 * initialize the correctAnswers object with the correct key value pairs. 
**/
console.log("add correct answers dumbass");
correctAnswers[tests[0]] = "779";
correctAnswers[tests[1]] = "888";
correctAnswers[tests[2]] = "123";
correctAnswers[tests[3]] = "312";
correctAnswers[tests[4]] = "321";

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
  window.location = tests[0].concat(".html");
}

/**
 * check the input test for correctness
**/
function check() {
  var giveUpButton = document.getElementById("GiveUp");
  var submitButton = document.getElementById("Submit");
  var inputField = document.getElementById("input");
  var inputValue = inputField.value;
  if (correctAnswers[tests[currentTest]] == inputValue) {
    giveUpButton.setAttribute("disabled", "");
    submitButton.removeAttribute("disabled");
    inputField.classList.remove("incorrect");
    inputField.classList.add("correct");
  } else {
    submitButton.setAttribute("disabled", "");
    giveUpButton.removeAttribute("disabled");
    inputField.classList.remove("correct");
    inputField.classList.add("incorrect");
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
  window.location = tests[currentTest].concat(".html");
}