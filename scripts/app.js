const gameData=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

let editedPlayer=0;
let activePlayer=0;  //used for the game pplayer chaanging mechanism
let currentRound=1;  //used for checking the number of the rounds
let gameIsOver=false;  

const players=[
    {name:'',
     symbol:"X"},
    {name:'',
    symbol:"O"},
];

const playerConfigOverlayElement=document.getElementById("config-overlay");
const backdropElement=document.getElementById("backdrop");
const formElement=document.querySelector("form");
const errorsOutputElement=document.getElementById("config-errors");
const gameAreaElement=document.getElementById("active-game");
const activePlayerNameElement=document.getElementById("active-player-name");
const gameOverElement=document.getElementById("game-over");

const editPlayer1BtnElement=document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement=document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement=document.getElementById("cancel-config-btn");
const startNewGameBtnElement=document.getElementById("start-game-btn");
const gameFieldElements=document.querySelectorAll("#game-board li"); //returns array full of elements
const gameBoardElement= document.getElementById("game-board");

editPlayer1BtnElement.addEventListener("click",openPlayerConfig);
editPlayer2BtnElement.addEventListener("click",openPlayerConfig);

cancelConfigBtnElement.addEventListener("click",closePlayerConfig);
backdropElement.addEventListener("click",closePlayerConfig);

formElement.addEventListener("submit",savePlayerConfig) //handle the submit event by the form
startNewGameBtnElement.addEventListener("click",startNewGame);

for(const gameFieldElement of gameFieldElements){
    gameFieldElement.addEventListener("click",selectGameField);
}