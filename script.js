let boxes = document.querySelectorAll(".sq");
let count = 0;
let xcount=0;
let ocount=0;
var id = 1;
let apiLink = "https://localhost:7279/api/games";
let createNewGame = async () =>{
  const response = await fetch(apiLink, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  response.json().then((data) => {
    if(data != null)
      console.log(data);
  }).catch((err)=> console.log(err));
 }
createNewGame();

let checkWin = () => {

  let data = document.getElementsByClassName("sq");
  let condition = [
    [0, 1, 2, 4, 4, 0],
    [3, 4, 5, 4, 10, 0],
    [6, 7, 8, 4, 18, 0],
    [0, 3, 6, -6, 12, 90],
    [1, 4, 7, 3, 12, 90],
    [2, 5, 8, 13, 12, 90],
    [0, 4, 8, 3, 12, 35],
    [2, 4, 6, 3, 12, 138],
  ];
  condition.forEach((element) => {
    if (
      data[element[0]].innerText === data[element[1]].innerText &&
      data[element[2]].innerText === data[element[1]].innerText &&
      data[element[0]].innerText !== ""
    ) {
      if(data[element[0]].innerText == "X")
      xcount++;
      else
      ocount++;
      let object = {
        "winner": data[element[0]].innerText,
        "xCount": xcount,
        "oCount":ocount,
      }
      //UpdateWinner(data[element[0]].innerText);
      UpdateWinner(object);
      document.getElementsByClassName("info")[0].innerText =
        data[element[0]].innerText + " WON";
      document.getElementById("win-gif").style.display = "block";
      document.querySelector(".line").style.width = "80%";
      document.querySelector(".line").style.transform = `translate(${element[3]}vw,${element[4]}vw) rotate(${element[5]}deg)`;
    }
  });
};

let myFunction = (e) =>{
  buttonText = e.target.innerText;
      count++;
      console.log(count);
      let cordinate = e.target.id;
      if (buttonText === "") {
        e.target.innerText = "X";
        checkWin();
        FillCoordinate(cordinate);
        if (count == 9) {
          let object = {
            "winner": "DRAW",
            "xCount": xcount,
            "oCount":ocount,
          }
          UpdateWinner(object);
          document.getElementsByClassName("info")[0].innerText = "DRAW";
        }

      }
 }
function start(e) {
  e.target.style.backgroundColor = "#caf0f8";
  for (items of boxes) {
    items.addEventListener("click",  myFunction);
  }
}

function resetGame() {
  id++;
  createNewGame();
  document.getElementById("start").style.backgroundColor = "#ffe4c4";
  let val = document.querySelectorAll(".sq");
  for (i of val) {
    i.innerHTML = "";
    i.style.backgroundColor = "#eeb1b1";
  }
  document.getElementsByClassName("info")[0].innerText = "Turn for " + 'X';
  document.querySelector(".line").style.width = "0";
  document.getElementById("win-gif").style.display = "none";
  count = 0;
  for(items of boxes)
  {
    items.removeEventListener("click", myFunction);
  }
}

 let UpdateWinner = async (obj) => {
  const response = await fetch(apiLink + '/' + id + '/winner'  , {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  response.json().catch(error => console.error('Unable to add winner.', error));
 }

 let FillCoordinate = async (cordinate) => {
  const response = await fetch(apiLink + '/' + id , {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cordinate)
  });
  response.json().then((data) => {
    if (data != "") {
      document.getElementById(data).innerText = "O";
      count++;
      console.log(count);
      checkWin();
    }
  })
    .catch(error => console.error('Unable to add item.', error));
 }
