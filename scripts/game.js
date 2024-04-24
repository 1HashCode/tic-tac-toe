function resetGameStatus(){
    activePlayer=0;
    currentRound=1;
    gameOverElement.firstElementChild.innerHTML='You Won!, <span id="winner-name"> PLAYER NAME</span>!';
    gameOverElement.style.display="none";
    gameIsOver=false;
    
    let gameBoardIndex=0;
    for(let i=0;i<3;++i){
        for(let j=0;j<3;++j){
            gameData[i][j]=0;
            const gameBoardItemElement=gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent="";
            gameBoardItemElement.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for the both player names");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer == 0) activePlayer = 1;
  else activePlayer = 0;

  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if(gameIsOver){   //gameOver variable, if the field is true then dont execute this. 
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;
  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("please select an empty field");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1; //storing 1 as X and 2 as O as 0 is the default value of the array elements in the 2D array
  const winnerId=checkForGameOver();

  if(winnerId!=0){
    endGame(winnerId);
    gameIsOver=true;
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
    //rows
  for (let i = 0; i < 3; ++i) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //checking the columns
  for (let i = 0; i < 3; ++i) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //diagonal top left to bottom right
  if( gameData[0][0]>0 && gameData[0][0]===gameData[1][1] && gameData[1][1]==gameData[2][2]){
    return gameData[0][0];
  }

  //diagonal bottom left to top right
  if( gameData[2][0]>0 && gameData[2][0]===gameData[1][1] && gameData[1][1]==gameData[0][2]){
    return gameData[2][0];
  }

  if(currentRound===9){
    return -1; //draw status
  }

  return 0;
}

function endGame(winnerId){
    gameOverElement.style.display="block";

    if(winnerId>0){
        const winnerName=players[winnerId-1].name;  
        gameOverElement.firstElementChild.firstElementChild.textContent=winnerName;    // getting the span element
    }
    else{
        gameOverElement.firstElementChild.textContent="It's a draw ! Lets have a rematch shall we ?";
    }
    
}
