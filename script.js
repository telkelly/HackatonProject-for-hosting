const squares = document.getElementsByClassName("square");
const different = document.getElementsByClassName("different").item(0);
const rulesBtn = document.getElementById("rules-btn");
const rulesDiv = document.getElementsByClassName("rules").item(0);
const mainDiv = document.getElementsByClassName("main-div").item(0);
const counter = document.getElementById("counter");
const lives = document.getElementById("lives");

let wrongAnswers = 0;
let textLives = 3;
const maxWrongAnswers = 3;

let scope = 0;
let isCalledOnce = true;
let isSquare = false;

function scopeCounter() {
  scope++;
  counter.textContent = scope;
}

rulesBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (isCalledOnce) {
    const newDiv = document.createElement("div");
    const newText = document.createTextNode(
      "The game is to find one color slightly different from other colors. You have three attempts during the whole game to find this color. The game consists of 8 levels."
    );
    newDiv.append(newText);
    newDiv.classList.add("rules-info");
    mainDiv.appendChild(newDiv);
    e.target.style.background = "#E4E4E4";
    isCalledOnce = false;
  } else {
    mainDiv.removeChild(mainDiv.lastElementChild);
    isCalledOnce = true;
    e.target.style.background = "white";
  }
});

different.addEventListener("click", function (e) {
  e.preventDefault();
  rightAnswer(e);
  setTimeout(() => {
    scopeCounter();
    secondLevel();
  }, 1000);
});

function rightAnswer(e) {
  e.target.style.border = "2px solid green";
}

function wrongAnswer(e) {
  e.target.style.border = "2px solid red";
}

function addConfetti() {
  let confetti = document.createElement("div");
  confetti.classList.add("confetti");
  for (let i = 0; i < 13; i++) {
    let newDiv = document.createElement("div");
    mainDiv.appendChild(newDiv);
    newDiv.classList.add("confetti-piece");
  }
}

function winner() {
  mainDiv.innerHTML = "";
  addConfetti();
  let newDiv = document.createElement("div");
  let newText = document.createTextNode("Your vision is amazing! You win!");
  let newBtn = document.createElement("button");
  newBtn.innerHTML = "Start again";
  let img = document.createElement("img");
  img.src = "./happycat.png";
  newDiv.appendChild(newText);
  newDiv.appendChild(img);
  newDiv.appendChild(newBtn);
  newDiv.classList.add("game-over");
  newBtn.classList.add("try-again");
  img.style.width = "100px";
  mainDiv.appendChild(newDiv);
  mainDiv.style.backgroundColor = "#DDD8E4";
  newBtn.addEventListener("click", startAgain);
}

function createRoundSquares(widthAndHeight, squareColor) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("square");
  newDiv.style.borderRadius = "50%";
  newDiv.style.width = widthAndHeight;
  newDiv.style.height = widthAndHeight;
  newDiv.style.background = squareColor;
  mainDiv.appendChild(newDiv);
}

function getRandom() {
  let newDivs = Array.from(mainDiv.children);
  let randomSquare = newDivs[Math.floor(Math.random() * newDivs.length)];
  randomSquare.classList.add("different");
}

function livesCounter() {
  wrongAnswers++;
  lives.textContent = ` ${--textLives}`;
}

function gameOver() {
  for (let square of squares) {
    if (square) {
      square.addEventListener("click", function (e) {
        if (e.target) {
          wrongAnswer(e);
          livesCounter();
          if (wrongAnswers >= maxWrongAnswers) {
            setTimeout(() => {
              mainDiv.innerHTML = "";
              mainDiv.style.background = "#DDD8E4";
              let newDiv = document.createElement("div");
              let newText = document.createTextNode(
                "You did well, but it is the end. Try again, champion!"
              );
              let newBtn = document.createElement("button");
              newBtn.innerHTML = "Try again";
              let img = document.createElement("img");
              img.src = "./sadcat.png";
              newDiv.appendChild(newText);
              newDiv.appendChild(img);
              newDiv.appendChild(newBtn);
              newDiv.classList.add("game-over");
              newBtn.classList.add("try-again");
              img.style.width = "100px";
              mainDiv.appendChild(newDiv);
              newBtn.addEventListener("click", startAgain);
            }, 1000);
          }
        }
      });
    } else {
      return false;
    }
  }
}

function startAgain() {
  scope = 0;
  counter.textContent = scope;
  wrongAnswers = 0;
  textLives = 3;
  lives.textContent = ` ${textLives}`;
  secondLevel();
}

function secondLevel() {
  mainDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("square");
    newDiv.style.background = "#F0A00F";
    mainDiv.appendChild(newDiv);
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#F2B039";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      thirdLevel();
    }, 1000);
  });
}

function thirdLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("square");
    newDiv.style.background = "#368BC9";
    mainDiv.appendChild(newDiv);
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#5EA2D4";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      forthLevel();
    }, 1000);
  });
}

function forthLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  mainDiv.style.background = "#787878";
  for (let i = 0; i < 12; i++) {
    createRoundSquares("70px", "#9FB24D");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#B2C171";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      fifthLevel();
    }, 1000);
  });
}

function fifthLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    createRoundSquares("50px", "#FCC438");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#FDD36A";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      sixthLevel();
    }, 1000);
  });
}

function sixthLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  mainDiv.style.background = "#2C2323";
  for (let i = 0; i < 30; i++) {
    createRoundSquares("35px", "#34C4CB");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#5DCFD5";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      seventhLevel();
    }, 1000);
  });
}

function seventhLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  for (let i = 0; i < 36; i++) {
    createRoundSquares("30px", "#2AD5B0");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#55DDC0";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      eighthLevel();
    }, 1000);
  });
}

function eighthLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  for (let i = 0; i < 35; i++) {
    createRoundSquares("35px", "#726E91");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#8E8BA7";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      ninthLevel();
    }, 1000);
  });
}

function ninthLevel() {
  scopeCounter();
  mainDiv.innerHTML = "";
  for (let i = 0; i < 42; i++) {
    createRoundSquares("30px", "#F0CF0F");
  }
  getRandom();
  const different = document.getElementsByClassName("different").item(0);
  different.classList.remove("square");
  different.style.background = "#F3D83F";
  gameOver();
  different.addEventListener("click", function (e) {
    rightAnswer(e);
    setTimeout(() => {
      winner();
    }, 1000);
  });
}
