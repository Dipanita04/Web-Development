console.log("Welcome to Tic Tac Tac");
let audioTurn = new Audio("turns.mp3");
let gameover = new Audio("gameover.mp3");
let gameFinish = new Audio("therealgameover.wav");
let music = document.getElementById("myAudio");

let turn = "X";
let isgameover = false;

let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");

playButton.addEventListener("click", function () {
  music.play();
});

stopButton.addEventListener("click", function () {
  music.pause();
  music.currentTime = 0;
});

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check if the game is a draw
const checkDraw = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let isDraw = true;
  for (let i = 0; i < boxtext.length; i++) {
    if (boxtext[i].innerText === "") {
      isDraw = false;
      break;
    }
  }
  return isDraw;
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, -17, 5, 0],
    [3, 4, 5, -17, 15, 0],
    [6, 7, 8, -17, 25, 0],
    [0, 3, 6, -27, 15, 90],
    [1, 4, 7, -17, 15, 90],
    [2, 5, 8, -7, 15, 90],
    [0, 4, 8, -17, 15, 45],
    [2, 4, 6, -17, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        "Hurrah ! ! " + boxtext[e[0]].innerText + " Won The Game ";
      isgameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(".line").style.width = "25vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
    }
  });
};

// Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
        if (checkDraw()) {
          gameFinish.play();
          document.querySelector(".info").innerText =
            " GAME OVER . IT'S A DRAW ! ";
          isgameover = true;
        }
      } else {
        gameover.play();
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});
