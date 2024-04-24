function openPlayerConfig(event) {
  editedPlayer=+event.target.dataset.playerid; //converting to numbers from string
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";

}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "None";
  backdropElement.style.display = "None";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value="";
}

function savePlayerConfig(event) {
  //handling the form submission
  event.preventDefault(); //prevents the default nature of the forms to submit information to the server
  const formData = new FormData(event.target); //getting the form data
  const enteredPlayername = formData.get("playername").trim();

  if (!enteredPlayername) {
    //if the string is empty or not.
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name";  
    return;
  }

  const updatedPlayerDataElement=document.getElementById("player-" + editedPlayer + "-data");
  updatedPlayerDataElement.children[1].textContent=enteredPlayername;  //dom traversal

  players[editedPlayer-1].name=enteredPlayername;

  closePlayerConfig();
}
