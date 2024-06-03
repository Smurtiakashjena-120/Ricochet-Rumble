//accessing the container
let container=document.querySelector(".container")
//acessing gmae board and start button
let gameBoard=document.querySelector(".gameBoard")

//accesing each squares
let squares=gameBoard.childNodes;



//SVGs for items
var TriangleBlue =  '<div class="piece triangle" group="blue" char="triangle" direction="right"><svg class="triangle" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<polygon points="10,10 90,10 10,90" fill="blue" stroke="black"/>' +
'</svg></div>';
var TriangleRed =  '<div class="piece triangle flipped" group="red" char="triangle" direction="left"><svg class="triangle" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<polygon points="10,90 90,90 10,10" fill="red" stroke="black"/>' +
'</svg></div>';
var canonBlue =  '<div class="piece tank" char="canon" group="blue"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="blue" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">canon</text>' +
'</svg></div>';
var canonRed =  '<div class="piece tank" char="canon" group="red"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="red" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">canon</text>' +
'</svg></div>';
var LineBlue = '<div class="piece line" group="blue" char="line" direction="right"><svg class="line" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<line x1="10" y1="90" x2="90" y2="10" stroke="blue" stroke-width="2"/>' +
'</svg></div>';
var LineRed = '<div class="piece line" group="red" char="line" direction="left"><svg class="line" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<line x1="10" y1="90" x2="90" y2="10" stroke="red" stroke-width="2"/>' +
'</svg></div>';
var tankRed =  '<div class="piece absorb" group="red" char="tank"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">'+
'<rect x="10" y="10" width="80" height="80" fill="red" />'+
'<line x1="10" y1="10" x2="90" y2="10" stroke="white" stroke-width="5" />'+
'<text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">tank</text>'+
'</svg></div>';

var tankBlue =  '<div class="piece absorb" group="blue" char="tank"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">'+
'<rect x="10" y="10" width="80" height="80" fill="blue" />'+
'<line x1="10" y1="90" x2="90" y2="90" stroke="white" stroke-width="5" />'+
'<text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">tank</text>'+
'</svg></div>';
var titanRed =  '<div class="piece titan" group="red" char="titan"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="red" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">titan</text>' +
'</svg></div>';
var titanBlue =  '<div class="piece titan" group="blue" char="titan"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="blue" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">titan</text>' +
'</svg></div>';


//array for storing element

//logic for creating 8 c 8 board
const cells = [];
function createBoard(){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;
        gameBoard.appendChild(square);
        cells.push(square);
    }
  }
  gameBoard.childNodes[9].innerHTML = TriangleBlue;
  gameBoard.childNodes[6].innerHTML = LineBlue;//14
  gameBoard.childNodes[3].innerHTML = canonBlue;//3
  gameBoard.childNodes[57].innerHTML = canonRed;
  gameBoard.childNodes[59].innerHTML = TriangleRed;
  gameBoard.childNodes[55].innerHTML = LineRed;
  gameBoard.childNodes[20].innerHTML = tankBlue;
  gameBoard.childNodes[42].innerHTML = tankRed;
  gameBoard.childNodes[4].innerHTML = titanBlue;
  gameBoard.childNodes[61].innerHTML = titanRed;

 
}
createBoard()
let allSquares=document.querySelectorAll(".square");

//addding draggable attribute
squares.forEach(square =>{
  if(square.firstChild){
    square.firstChild.setAttribute('draggable',true)
  }
})
//adding logic for draging event
// squares.forEach(square =>{
//   square.addEventListener('dragstart',dragStart)
//   square.addEventListener('dragover',dragOver)
//   square.addEventListener('drop',dragDrop)
// })

//dragStart function variable
let startRow;
let startCol;
let draggedElement;



//TIMER LOGIC AND TURN CHANGE LOGIC

///Timer Logic
let turnHeading=document.querySelector(".turnHeading")
let turn="blue";



let minTime=1000
let timer=0;
let pausedValue;
let intervalID = null;

function startTimer(duration, display) {
  pausedValue=0;
    timer = duration;
    intervalID = setInterval(function () {
        display.innerText = `Time Left: ${timer}s`;

        if (--timer < 0) {
            clearInterval(intervalID);
            gameOver();
        }
    }, 1000);
}

//Game Pause Logic

let pauseBtn=document.querySelector("#pauseGame");

pauseBtn.addEventListener("click",()=>{

if(pauseBtn.innerText=="Pause"){
    pauseBtn.innerText="Play";
     let display=document.querySelector("#timer")
  
    // Clear the previous interval if it exists and store the value
    pausedValue=timer;
   if (intervalID !== null) {
       clearInterval(intervalID);
   }
    display.innerText = `Time Left: ${timer}s`;

   }
else if(pauseBtn.innerText == "Play")
     {
     
     pauseBtn.innerText="Pause";
     let display=document.querySelector("#timer")
     let newTime=pausedValue;
   // Start a new timer
     startTimer(newTime, display);
    // pauseBtn.innerText= pauseBtn.innerText=="Pause" ? "Play" : "Pause";
    }
})


//GameOver Logic
function gameOver(){
alert(`TIME OVER !! ${turn} has lost the game`);
location.reload();

}
//Reset Game Logic
let resetBtn=document.querySelector("#restartGame");
resetBtn.addEventListener("click",()=>{
  //function is at end side
  alert("Game Restarting !!!")
  resetGame();
})


//on window load logic

window.onload=()=>{
  turnHeading.innerText=`${turn}'s Turn`;
  pauseBtn.innerText="Pause";

  // console.log(turn);
  let display=document.querySelector("#timer");
  let totalTime=60;
  startTimer(totalTime, display);

}

function updateTurn(group){
  // console.log(turn);
turnHeading.innerText=`${group}'s Turn`;
clearBtns()

//time update
let totalTime=60; // 60 seconds
let display = document.getElementById('timer');

// Clear the previous interval if it exists
if (intervalID !== null) {
    clearInterval(intervalID);
}

// Reset the display for the new timer
display.innerText = `Time Left: ${totalTime}s`;

// Start a new timer
startTimer(totalTime, display);



}


//function for highlighting neighbours

let highLightFlag=false;

function highLight(square){

let hRow=parseInt(square.dataset.row);
let hCol=parseInt(square.dataset.col);

//ensures that every box become neutral before new highlight start
allSquares.forEach(div =>{
  div.style.backgroundColor="grey";
})

  if(highLightFlag){
     if(square.firstChild.getAttribute("char") != "canon"){

      allSquares.forEach(div => {
        if(!div.firstChild){
          let r=parseInt(div.dataset.row);
          let c= parseInt(div.dataset.col);
         
          let rowDiff =Math.abs(hRow-r);
          let colDiff=Math.abs(hCol-c);
         if(((rowDiff == 0) && (colDiff == 1)) || ((rowDiff == 1) && (colDiff == 0)) || ((rowDiff == 1) && (colDiff == 1))){
          div.style.backgroundColor="greenyellow";
         }
        }
       })
     }
     else{
      allSquares.forEach(div => {
        if(!div.firstChild){
          let r=parseInt(div.dataset.row);
          let c= parseInt(div.dataset.col);
         
          let rowDiff =Math.abs(hRow-r);
          let colDiff=Math.abs(hCol-c);
         if(((rowDiff == 0) && (colDiff == 1))){
          div.style.backgroundColor="greenyellow";
         }
        }
       })
     }

  }else{
    allSquares.forEach(div =>{
      div.style.backgroundColor="grey";
    })
  }
}

//moving logic!!!
let moveFlag=false;

allSquares.forEach(square => {
  square.addEventListener("click" , ()=>{
    if(square.firstChild){
      dragStart(square);
    }

  })
})
allSquares.forEach(square => {
  square.addEventListener("click" , ()=>{
    if(square.style.backgroundColor =="greenyellow"){
      moveFlag=true;
      dragDrop(square);
    }
  })
})





//undo redo initiation variable
let undoStartObject={
  row:null,
  col:null,
}
let undoEndObject={
  row:null,
  col:null,
}



//Dragging logic!!!

function dragStart(square){
  clearBtns();
  clearSwapBtns();
  draggedElement=square.firstChild;
  
  if(draggedElement){
    highLightFlag=true;
    highLight(square);
    startRow=square.dataset.row;
    startCol=square.dataset.col;
  } 
  
}

let endRow;
let endCol;
async function dragDrop(square){
  // console.log(draggedElement.getAttribute("class"))
  let dragName=draggedElement.getAttribute("class");
  let dragGrp=draggedElement.getAttribute("group");
 

  endRow=square.dataset.row;
  endCol=square.dataset.col;

  //updating undoStart object
  undoStartObject.row=startRow;
  undoStartObject.col=startCol;


  //logic for updating undoEnd object
  undoEndObject.row=endRow;
  undoEndObject.col=endCol;
  
  if( ((Math.abs(endRow - startRow )== 1 && Math.abs(endCol-startCol )==1) || (Math.abs(endRow - startRow )== 0 && Math.abs(endCol-startCol )==1)|| (Math.abs(endRow - startRow )== 1 && Math.abs(endCol-startCol )==0)) && dragName != "piece tank"){
    if(!square.firstChild){
      await square.append(draggedElement)
      createBullet(dragGrp)
      turn = turn === "red" ? "blue" : "red";
      updateTurn(turn);
       // Add event listener to the new square
    square.addEventListener("click", () => {
      startRotate(square);
    });
    square.addEventListener("click", () => {
      startSwap(square);
    });
    highLightFlag=false;
    moveFlag=false;
    highLight(draggedElement.parentNode);
    clearBtns();
    
    
    }
  }
  if((dragName == "piece tank") && ((Math.abs(endRow - startRow )== 0 && Math.abs(endCol-startCol )==1))){
   await square.append(draggedElement)
   createBullet(dragGrp);
   turn = turn === "red" ? "blue" : "red";
   updateTurn(turn);
     // Add event listener to the new square
     square.addEventListener("click", () => {
      startRotate(square);
    });
    square.addEventListener("click", () => {
      startSwap(square);
    });

    highLightFlag=false;
    moveFlag=false;
    highLight(draggedElement.parentNode);
    clearBtns();
  
   
  } 
  
}

//Undo Redo logic !!!
const undoBtn=document.querySelector("#undo");
const redoBtn=document.querySelector("#redo");

//declaring variable do that redo can only be done if undo has done just before
let undoFlag=false;
let redoFlag=false;

undoBtn.addEventListener("click",()=>{
  UndoMove();
})
redoBtn.addEventListener("click",()=>{
  RedoMove();
})

//declaring a variable such that if redo called then it will add that step to historyArray
let redoSentence;

function UndoMove(){
  //ensuring that atleast one move has been played
  if(!undoStartObject.row) return;

  let moveObj;
  undoFlag=true;
  allSquares.forEach(square=>{
            let r = square.dataset.row;
            let c = square.dataset.col;
        if((r == undoEndObject.row) && (c == undoEndObject.col)){
          moveObj=square.firstChild;
          square.firstChild.remove();
        }    
  
  })
  allSquares.forEach(square=>{
            let r = square.dataset.row;
            let c = square.dataset.col;
        if((r == undoStartObject.row) && (c == undoStartObject.col)){
          square.appendChild(moveObj);
          turn = turn === "red" ? "blue" : "red";
          updateTurn(turn);
        }    
  
  })

//ensures that if undo happen then the added history should also removed
  redoSentence=historyArr.pop();


}
function RedoMove(){
if(undoFlag){
  undoFlag=false;

allSquares.forEach(square=>{
    let r = square.dataset.row;
    let c = square.dataset.col;
if((r == undoStartObject.row) && (c == undoStartObject.col)){
  moveObj=square.firstChild;
  square.firstChild.remove();
}    

})
allSquares.forEach(square=>{
    let r = square.dataset.row;
    let c = square.dataset.col;
if((r == undoEndObject.row) && (c == undoEndObject.col)){
  square.appendChild(moveObj);
  turn = turn === "red" ? "blue" : "red";
  updateTurn(turn);
}    

})

historyArr.push(redoSentence);
redoSentence="";

redoFlag=true;

}

}






//Bullet Movement Logic.....

let bulletPostion=0;
let bulletStartCol;
let bulletStartRow;
let endBlue=7;
let endRed=0;
let endLeft=0;
let endRight=7;
let moveBulletRightCalled=false;
let moveBulletLeftCalled=false;
let goUpCalled=false;
let goDownCalled=false;

 function createBullet(dragGrp){

 clearSwapBtns();
clearBtns()
  //sending data to save history
  //if sentence ensuring that if item has rotated or swaped then it should not start
  if(draggedElement){
    let sentence=`${dragGrp} ${draggedElement.getAttribute("char")} move from [ ${startRow} , ${startCol} ] to [ ${endRow} , ${endCol} ]`

    let hisObject={
      colour:dragGrp,
      char:draggedElement.getAttribute("char"),
      type:"move",
      startingRow:startRow,
      startingCol:startCol,
      endingRow:endRow,
      endingCol:endCol,
      sentence:sentence
    }
    saveHistory(hisObject);
  }

  // console.log(dragGrp)
  allSquares.forEach(square=>{
    if(square.firstChild ){
      if((square.firstChild.getAttribute("class") == "piece tank") && (square.firstChild.getAttribute("group") == dragGrp)){
      bulletStartCol=square.dataset.col;
      bulletStartRow=square.dataset.row;
     
      }
    }
  })
const bullet=document.createElement("div");
bullet.classList.add('bullet');
allSquares.forEach(square => {
  let r = square.dataset.row;
  let c = square.dataset.col;
  if (r == bulletStartRow && c == bulletStartCol){
    square.appendChild(bullet);

  }})

  bulletPostion=bulletStartRow;
  disableDrag();
  

 
 playSound();



  if(dragGrp=="blue"){
    moveBulletDown();
  }else{
    moveBulletUp();
  }
 
}
//from chatGpt

// Function to play the sound 
function playSound() {
 
      // Create a new audio element
      var audio = new Audio('bullet.wav');

      // Play the sound
      audio.play();
 
}



function moveBulletDown(){
  let bullet=document.querySelector('.bullet');
  if (!bullet) return;

  if(!moveBulletRightCalled && !moveBulletLeftCalled){
    bulletPostion++;
  }
      if (bulletPostion <= endBlue) {
          allSquares.forEach(square => {
              let r = square.dataset.row;
              let c = square.dataset.col;
              if (r == bulletPostion && c == bulletStartCol) {
                  if (square.firstChild) {
                    //if bullet strikes with an triangle
                    if((square.firstChild.getAttribute("char") == "triangle" && square.firstChild.getAttribute("group") != "blue") || (square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") != "blue")){
                     
                      if(square.firstChild.getAttribute("direction") == "right"){
                        moveBulletRightCalled=true;
                        moveBulletRight();
                      }else{
                        moveBulletLeftCalled=true;
                        moveBulletLeft();
                      }
                      // bullet.remove();
                      // return;
                    }

                    else if((square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") == "blue")){
                      if(square.firstChild.getAttribute("direction") == "right"){
                        moveBulletLeftCalled=true;
                        moveBulletLeft();
          
                      }else{
                        moveBulletRightCalled=true;
                        moveBulletRight();
                      }
          
                    }
                    else if(square.firstChild.getAttribute("char") == "titan"){
                      let color=square.firstChild.getAttribute("group");
                        alert(`${color} lost the game`);
                        resetGame();
                    }
                    else if((square.firstChild.getAttribute("char") == "tank") && (square.firstChild.getAttribute("group") == "red")){
                      square.appendChild(bullet);
                    }
                    else{
                      updateTurn(turn);
                      enableDrag()
                      bullet.remove();
                      return;
                    }                      
                  } else {
                      square.appendChild(bullet);
                  }
              }
          });
          setTimeout(() => {
            moveBulletDown();
          }, 200);
      } else {
       
        updateTurn(turn);
          enableDrag();
          bullet.remove();
      }
}
function moveBulletUp(){
  let bullet = document.querySelector('.bullet');  // Select the existing bullet if any
  if (!bullet) return;


    if(!moveBulletRightCalled && !moveBulletLeftCalled){
      bulletPostion--;
        }
    if(bulletPostion >= endRed){
      allSquares.forEach(square=>{
        let r=square.dataset.row;
        let c=square.dataset.col;
        if(r == bulletPostion && c == bulletStartCol){
          if (square.firstChild) {
            if((square.firstChild.getAttribute("char") == "triangle" && square.firstChild.getAttribute("group") != "red") || (square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") != "red")){
              if(square.firstChild.getAttribute("direction") == "right"){
                moveBulletRightCalled=true;
                moveBulletRight();
              }else{
                moveBulletLeftCalled=true;
                moveBulletLeft();
              }
              // bullet.remove();
              // return;
            }
            else if((square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") == "red")){
              if(square.firstChild.getAttribute("direction") == "right"){
                moveBulletLeftCalled=true;
                moveBulletLeft();
  
              }else{
                moveBulletRightCalled=true;
                moveBulletRight();
              }
  
            }
            else if(square.firstChild.getAttribute("char") == "titan"){
              let color=square.firstChild.getAttribute("group");
                        alert(`${color} lost the game`);
                        resetGame();
          }
          else if((square.firstChild.getAttribute("char") == "tank") && (square.firstChild.getAttribute("group") == "blue")){
            square.appendChild(bullet);
          }
            else{
              updateTurn(turn);
              enableDrag()
              bullet.remove();
              return;
            }  
        } else {
            square.appendChild(bullet);
        }
        }
      })
      setTimeout(()=>{
        moveBulletUp();
      },200);
        }else{
          updateTurn(turn);
          enableDrag()
          bullet.remove();
        }

}





function moveBulletRight() {
  let bullet = document.querySelector('.bullet');  // Select the existing bullet if any
  if (!bullet) {
    bullet = document.createElement("div");
    bullet.classList.add('bullet');
  }

  let row = bulletPostion;
  if (moveBulletRightCalled) {
    bulletStartCol++;
  }

  if (bulletStartCol <= endRight && moveBulletRightCalled) {
    allSquares.forEach(square => {
      let r = square.dataset.row;
      let c = square.dataset.col;
      if (r == row && c == bulletStartCol.toString()) {
            if (square.firstChild && square.firstChild !== bullet) {
               if(square.firstChild.getAttribute("char") == "titan"){
                let color=square.firstChild.getAttribute("group");
                        alert(`${color} lost the game`);
                        resetGame();
                  }
              else if((square.firstChild.getAttribute("char") == "triangle")){
                         // if reflecting with blue triangle
                        if(square.firstChild.getAttribute("group") == "blue"){
                            //checking orientation of triangle and send accordingly
                            if(square.firstChild.getAttribute("direction") == "right"){
                                 updateTurn(turn);
                                 moveBulletRightCalled = false;
                                 bullet.remove();
                                 square.firstChild.remove();
                                enableDrag()
                                 return;
                            }else{
                              goDownCalled=true;
                              moveBulletRightCalled=false;
                              goDown();
                              return;
                            }

                        }
                        //if reflecting with red triangle
                        else if(square.firstChild.getAttribute("group") == "red"){
                           //checking orientation of triangle and send accordingly
                           if(square.firstChild.getAttribute("direction") == "right"){
                            updateTurn(turn);
                            moveBulletRightCalled = false;
                            square.firstChild.remove();
                            bullet.remove();
                           enableDrag()
                            return;
                       }else{
                         goUpCalled=true;
                         moveBulletRightCalled=false;
                         goUp();
                         return
                       }

                        }
                     }
              else if((square.firstChild.getAttribute("char") == "line")){
                         // if reflecting with blue line
                        if(square.firstChild.getAttribute("group") == "blue"){
                            //checking orientation of line and send accordingly
                            if(square.firstChild.getAttribute("direction") == "right"){
                                 goUpCalled=true;
                                 moveBulletRightCalled=false;
                                 goUp();
                                 return;
                            }else{
                              goDownCalled=true;
                              moveBulletRightCalled=false;
                              goDown();
                              return;
                            }

                        }
                        //if reflecting with red line
                        else if(square.firstChild.getAttribute("group") == "red"){
                           //checking orientation of line and send accordingly
                           if(square.firstChild.getAttribute("direction") == "right"){
                            goDownCalled=true;
                            moveBulletRightCalled=false;
                            goDown();
                            return;
                       }else{
                         goUpCalled=true;
                         moveBulletRightCalled=false;
                         goUp();
                         return;
                       }

                        }
                     }
              else{
                 updateTurn(turn);
                  moveBulletRightCalled = false;
                 bullet.remove();
                 enableDrag()
                 return;
                     }
           } else if (!square.firstChild) {
            // console.log("Appended child at: " + bulletStartCol);
             square.appendChild(bullet);
             }
      }
       });
       //to recall the function
    setTimeout(() => {
      moveBulletRight();
    }, 400);
  } 
  else {
    updateTurn(turn);
    moveBulletRightCalled = false;
    enableDrag();
    bullet.remove();
  }
}
 function moveBulletLeft() {
  let bullet = document.querySelector('.bullet');  // Select the existing bullet if any
  if (!bullet) {
    bullet = document.createElement("div");
    bullet.classList.add('bullet');
  }

  let row = bulletPostion;
  if (moveBulletLeftCalled) {
    bulletStartCol--;
  }
  if (bulletStartCol >= endLeft && moveBulletLeftCalled) {
    allSquares.forEach(square => {
      let r = square.dataset.row;
      let c = square.dataset.col;
      if (r == row && c == bulletStartCol) {
        if (square.firstChild && square.firstChild !== bullet) {
          if(square.firstChild.getAttribute("char") == "titan"){
            let color=square.firstChild.getAttribute("group");
                        alert(`${color} lost the game`);
                        resetGame();
             }
             else if((square.firstChild.getAttribute("char") == "triangle")){
              // if reflecting with blue triangle
             if(square.firstChild.getAttribute("group") == "blue"){
                 //checking orientation of triangle and send accordingly
                 if(square.firstChild.getAttribute("direction") == "right"){
                  goDownCalled=true;
                   moveBulletLeftCalled=false;
                   goDown();
                   return;
                     
                 }else{
                  updateTurn(turn);
                  moveBulletLeftCalled = false;
                  bullet.remove();
                  enableDrag()
                  return;
                 }

             }
             //if reflecting with red triangle
             else if(square.firstChild.getAttribute("group") == "red"){
                //checking orientation of triangle and send accordingly
                if(square.firstChild.getAttribute("direction") == "right"){
                 
                    goUpCalled=true;
                    moveBulletLeftCalled=false;
                    goUp();
                    return
                }else{
                   updateTurn(turn);
                   moveBulletLeftCalled = false;
                   bullet.remove();
                  enableDrag()
                  return;
            }

             }
                     }
            else if((square.firstChild.getAttribute("char") == "line")){
              // if reflecting with blue line
             if(square.firstChild.getAttribute("group") == "blue"){
                 //checking orientation of line and send accordingly
                 if(square.firstChild.getAttribute("direction") == "right"){
                  goDownCalled=true;
                  moveBulletLeftCalled=false;
                  goDown();
                  return;
                 }else{                   
                   goUpCalled=true;
                  moveBulletLeftCalled=false;
                     goUp();
                    return;
                 }

             }
             //if reflecting with red line
             else if(square.firstChild.getAttribute("group") == "red"){
                //checking orientation of line and send accordingly
                if(square.firstChild.getAttribute("direction") == "right"){
                  goUpCalled=true;
                  moveBulletLeftCalled=false;
                  goUp();
                  return;
            }else{
                goDownCalled=true;
                 moveBulletLeftCalled=false;
                 goDown();
                 return;
            }

             }
                   }             
          else{
              updateTurn(turn);
              moveBulletLeftCalled = false;
              bullet.remove();
             enableDrag()
             return;
             }
          
        } else if (!square.firstChild) {
          square.appendChild(bullet);
        }
      }
    });
    setTimeout(() => {
      moveBulletLeft();
    }, 300);
  } else {
    
    updateTurn(turn);
    moveBulletLeftCalled = false;
    enableDrag();
    bullet.remove();
  }
}



function enableDrag(){
  allSquares.forEach(square => {
    if(square.firstChild){
      square.firstChild.setAttribute('draggable',true)
    }
  })
}
function disableDrag(){
  allSquares.forEach(square => {
    if(square.firstChild){
      square.firstChild.setAttribute('draggable',false)
    }
  })
}
function disableDragForTurn(){
  allSquares.forEach(square => {
    if((square.firstChild) && (square.firstChild.getAttribute("group") != turn)){
      square.firstChild.setAttribute('draggable',false)
    }
  })
}


//rotating the roatatable item logic
allSquares.forEach(square=>{
  if(square.firstChild){
    square.addEventListener("click",()=>{//.firstChild
        startRotate(square)
    })
  }
  
})

function startRotate(square){
  if(square.firstChild){
    if(square.firstChild.getAttribute("char") == "triangle" || square.firstChild.getAttribute("char") == "line" ){
      
      disableClickTriangle();
      disableClickLine();
      rotateItem(square)
      
  }
  }

}


function rotateItem(square){

  //declaring row and column for sending to save item
 let r= square.dataset.row;
 let c=square.dataset.col;
 let grp=square.firstChild.getAttribute("group");

 clearBtns();
 

  let btn=document.createElement("button");
  btn.innerText="Rotate"
  container.appendChild(btn)
  btn.addEventListener("click",()=>{

    turn = turn==="red" ? "blue":"red";

    highLightFlag=false;
    highLight(draggedElement.parentNode)
    let rotatedItem=draggedElement;
    
    if (square.firstChild.classList.contains('flipped')) {
      // Class 'flipped' is present in the class list
      square.firstChild.classList.remove('flipped');
      clearBtns();
      enableClick();
         //so that it will not store the history again in create bullet
         draggedElement=null;

      createBullet(square.firstChild.getAttribute("group"));
  } else {
      // Class 'flipped' is not present in the class list
      square.firstChild.classList.add('flipped');
      clearBtns();
      enableClick();

          //so that it will not store the history again in create bullet
     draggedElement=null;

      createBullet(square.firstChild.getAttribute("group"));
  }

      if (square.firstChild.getAttribute("direction") == "right") {
        square.firstChild.setAttribute("direction","left")
       
        let sentence=`${grp} ${rotatedItem.getAttribute("char")} at [ ${r} , ${c} ] rotated to left`;

          let hisObject={
            colour:grp,
            type:"rotate",
            startingRow:r,
            startingCol:c,
          rotatedTo:"left",
          sentence:sentence
        
          }
          saveHistory(hisObject);

       
      } else {
        square.firstChild.setAttribute("direction","right")

        let sentence=`${grp} ${rotatedItem.getAttribute("char")} at [ ${r} , ${c} ] rotated to right`
        let hisObject={
          colour:grp,
          type:"rotate",
          startingRow:r,
          startingCol:c,
        rotatedTo:"right",
        sentence:sentence
        }
        saveHistory(hisObject);
      }



    
   
  })

}
function enableClick(){
  allSquares.forEach(square=>{
    if(square.firstChild){
      square.firstChild.style.pointerEvents = 'auto';
    }
  })
}
function enableClickTriangle(){
  allSquares.forEach(square=>{
    if((square.firstChild)&&(square.firstChild.getAttribute("char")=="triangle")){
      square.firstChild.style.pointerEvents ='auto';
    }
    
  })
}
function enableClickLine(){
  allSquares.forEach(square=>{
    if((square.firstChild)&&(square.firstChild.getAttribute("char")=="line")){
      square.firstChild.style.pointerEvents ='auto';
    }
    
  })
}

//disabling further click such that more than one button will not be added
function  disableClick(){

  allSquares.forEach(square=>{
    if(square.firstChild){
      square.firstChild.style.pointerEvents = 'none';
    }
  })
 
}

function disableClickLine(){

  allSquares.forEach(square=>{
    if((square.firstChild) && (square.firstChild.getAttribute("char")=="line")){
      square.firstChild.style.pointerEvents = 'none';
    }
    
  })

}
function disableClickTriangle(){

  allSquares.forEach(square=>{
    if((square.firstChild) && (square.firstChild.getAttribute("char")=="triangle")){
      square.firstChild.style.pointerEvents = 'none';
    }
    
  })

}


function goDown() {
  let bullet = document.querySelector('.bullet');  
  if(!goDownCalled) return;
  if (!bullet) {
    bullet = document.createElement("div");
    bullet.classList.add('bullet');
  }

  if (!moveBulletRightCalled && !moveBulletLeftCalled) {
    bulletPostion++;
  }
  
  if (bulletPostion <= endBlue) {
    allSquares.forEach(square => {
      let r = square.dataset.row;
      let c = square.dataset.col;
      if (r == bulletPostion && c == bulletStartCol) {
        if (square.firstChild) {
          if ((square.firstChild.getAttribute("char") == "triangle" && square.firstChild.getAttribute("group") != "blue") || (square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") != "blue")) {
            if (square.firstChild.getAttribute("direction") == "right") {
              moveBulletRightCalled = true;
              goDownCalled=false;
              moveBulletRight();
            } else {
              goDownCalled=false;
              moveBulletLeftCalled = true;
              moveBulletLeft();
            }
          } 
          else if((square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") == "blue")){
            if(square.firstChild.getAttribute("direction") == "right"){
              moveBulletLeftCalled=true;
              moveBulletLeft();

            }else{
              moveBulletRightCalled=true;
              moveBulletRight();
            }

          }
           else if (square.firstChild.getAttribute("char") == "titan") {
            let color = square.firstChild.getAttribute("group");
            alert(`${color} lost the game`);
            resetGame();
          }
          else if((square.firstChild.getAttribute("char") == "tank") && (square.firstChild.getAttribute("group") == "red")){
            square.appendChild(bullet);
          }
          else {
            goDownCalled=false;
            updateTurn(turn);
            enableDrag()
            bullet.remove();
            return;
          }
        } else {
          square.appendChild(bullet);
        }
      }
    });
    // Recursively call goDown until bullet reaches its destination
    setTimeout(goDown,350);
  } else {
    goDownCalled=false;
    updateTurn(turn);
    enableDrag();
    bullet.remove();
  }
}


function goUp() {
  let bullet = document.querySelector('.bullet'); 

  if(!goUpCalled) return; 
  if (!bullet) {
    bullet = document.createElement("div");
    bullet.classList.add('bullet');
  }

  if (!moveBulletRightCalled && !moveBulletLeftCalled) {
    bulletPostion--;
  }
  
  if ((bulletPostion >= endRed) ) {
    allSquares.forEach(square => {
      let r = square.dataset.row;
      let c = square.dataset.col;
      if (r == bulletPostion && c == bulletStartCol) {
        if (square.firstChild) {
          if ((square.firstChild.getAttribute("char") == "triangle" && square.firstChild.getAttribute("group") != "red") || (square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") != "red")) {
            if (square.firstChild.getAttribute("direction") == "right") {
              moveBulletRightCalled = true;
              goUpCalled=false;
              moveBulletRight();
            } else {
              moveBulletLeftCalled = true;
              goUpCalled=false;
              moveBulletLeft();
            }
          }
          else if((square.firstChild.getAttribute("char") == "line" && square.firstChild.getAttribute("group") == "red")){
            if(square.firstChild.getAttribute("direction") == "right"){
              moveBulletLeftCalled=true;
              moveBulletLeft();

            }else{
              moveBulletRightCalled=true;
              moveBulletRight();
            }

          } 
          else if (square.firstChild.getAttribute("char") == "titan") {
            let color = square.firstChild.getAttribute("group");
            alert(`${color} lost the game`);
            resetGame();
          }
          else if((square.firstChild.getAttribute("char") == "tank") && (square.firstChild.getAttribute("group") == "blue")){
            square.appendChild(bullet);
          }
           else {
            goUpCalled=false;
            updateTurn(turn);
            enableDrag()
            bullet.remove();
            return;
          }
        } else {
          square.appendChild(bullet);
        }
      }
    });
    // Recursively call goDown until bullet reaches its destination
    setTimeout(goUp,350);
  } else {
    goUpCalled=false;
    updateTurn(turn);
    enableDrag();
    bullet.remove();
  }
}



///swaping line with other element

let swapFlag = false;
//initialising swaping element
let lineElement;
let swapFinalElement;
// initialising variable for row and column
let swapStartObject={
  row:null,
  col:null
}
let swapEndObject={
  row:null,
  col:null
}




//function to remove btns
function clearBtns(){
  const container = document.querySelector('.container');

  // Select all buttons within the container
  const buttons = container.querySelectorAll('button');

// Iterate over the buttons to find and remove buttons with specific inner text
   buttons.forEach(button => {
    if (button.innerText === 'Rotate') {//button.innerText === 'Swap' ||
        button.remove();
    }
});
enableClick();
}
//function to remove swap btns
function clearSwapBtns(){
  const container = document.querySelector('.container');

  // Select all buttons within the container
const buttons = container.querySelectorAll('button');

// Iterate over the buttons to find and remove buttons with specific inner text
buttons.forEach(button => {
    if (button.innerText === 'Swap') {
        button.remove();
    }
});

enableClick();

}




//  to add "Swap" button to squares containing a line
allSquares.forEach(square => {
  if (square.firstChild && square.firstChild.getAttribute("char") === "line") {
    square.addEventListener("click", () => {
      
    startSwap(square);
    });
  }
});


function startSwap(square){
  clearSwapBtns();
  if(!(square.firstChild.getAttribute("char")=="line")) return;
  const swapBtn = document.createElement("button");
  swapBtn.innerText = "Swap";
  container.appendChild(swapBtn);

  //for the "Swap" button
  swapBtn.addEventListener("click", () => {
    swapFlag = true; // Set swapFlag to true when the button is clicked

    //such that the triangle will be touchable
    enableClickTriangle();
    enableClickLine();
    

    //updating variable such that i can swap later with coordinates
    lineElement=square.firstChild;
    swapStartObject.row=square.dataset.row;
    swapStartObject.col=square.dataset.col;
  });

}





// for all squares to check if swapFlag is true
allSquares.forEach(square => {
  square.addEventListener("click", () => {
    if ((swapFlag && square.firstChild) && (square.firstChild.getAttribute("char") != "titan")) {
      swapFinalElement=square.firstChild;
      swapEndObject.row=square.dataset.row;
      swapEndObject.col=square.dataset.col;

      swapTriangle(); 

    }
    else{
      swapFlag=false;
    }
  });
});

//  handle swapping logic
function swapTriangle(e) {
  //ensure that there shouod not ne extra buttons
clearBtns();
  //updating triangle's place
allSquares.forEach(square=>{
  r=square.dataset.row;
  c=square.dataset.col;
  if((r == swapStartObject.row) && (c == swapStartObject.col)){
    square.innerHTML = ""; // Clear the square
   square.appendChild(swapFinalElement);

  }
})

  //updating endElement's place
allSquares.forEach(square=>{
  r=square.dataset.row;
  c=square.dataset.col;
  if((r == swapEndObject.row) && (c == swapEndObject.col)){
    square.innerHTML = ""; // Clear the square
   square.appendChild(lineElement);
   //ensuring that event listner should work in new place also
   square.addEventListener("click", () => {
    startSwap(square);
  });

  }
})
//logic to remove highlight
highLightFlag=false;
highLight(draggedElement.parentNode)
//logic to send to history saving

let sentence=`${lineElement.getAttribute("group")} rickochet from [ ${swapStartObject.row},${swapStartObject.col} ] swaped with ${swapFinalElement.getAttribute("group")}   ${swapFinalElement.getAttribute("char")} to [ ${swapEndObject.row},${swapEndObject.col} ]`;

let hisObject={
  colour:lineElement.getAttribute("group"),
  type:"swap",
  startingRow:swapStartObject.row,
  startingCol:swapStartObject.col,
  endingRow:swapEndObject.row,
  endingCol:swapEndObject.col,
  sentence:sentence
}


saveHistory(hisObject);

//clearing all previously stored value

turn = turn==="red" ? "blue":"red";
swapFlag = false; // Reset the swap flag
swapStartObject.row=null;
swapStartObject.col=null;
swapEndObject.row=null;
swapEndObject.col=null;
draggedElement=null;
//calling to remove two btns : swap,rotate
clearBtns();
enableClickTriangle();



createBullet(lineElement.getAttribute("group"));

}



//history saving logic

let historyArr=[];


function saveHistory(sentence){
  
  historyArr.push(sentence);


}



//gameover / game reset logic
function resetGame(){
 
  clearInterval(intervalID);

//storing in local storage
// Convert the array to a JSON string
let saveInLocal = JSON.stringify(historyArr);   //JSON.parse => for re converting

// Save the JSON string to local storage
localStorage.setItem('replaysave', saveInLocal);

  location.reload()



}

//replay logic
const replayBtn=document.querySelector("#replayBtn")
//array to handle all rplay logic
let lastGameArr=[];
replayBtn.addEventListener("click",()=>{
  
  showReplay();
})


function showReplay(){

  // location.reload();
  const historyData = localStorage.getItem('replaysave');
  const parsedData = JSON.parse(historyData);
   const heading=document.querySelector(".heading")
   const timerContainer=document.querySelector(".TimerContainer")
   const btnContainer=document.querySelector(".pause-restart-container")
  gameBoard.innerHTML="";
  heading.innerHTML=""
  timerContainer.innerHTML="";
  btnContainer.innerHTML="";
  clearInterval(intervalID);

  heading.innerHTML="PREVIOUS GAME REPLAY !!!"


  //recreating board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;
        gameBoard.appendChild(square);
        cells.push(square);
    }
  }
  gameBoard.childNodes[8].innerHTML = TriangleBlue;
  gameBoard.childNodes[5].innerHTML = LineBlue;//14
  gameBoard.childNodes[2].innerHTML = canonBlue;//3
  gameBoard.childNodes[56].innerHTML = canonRed;
  gameBoard.childNodes[58].innerHTML = TriangleRed;
  gameBoard.childNodes[54].innerHTML = LineRed;
  gameBoard.childNodes[19].innerHTML = tankBlue;
  gameBoard.childNodes[41].innerHTML = tankRed;
  gameBoard.childNodes[3].innerHTML = titanBlue;
  gameBoard.childNodes[60].innerHTML = titanRed;

 

  lastGameArr=parsedData;

if(lastGameArr == null) {
  alert("Play a game to store a Replay !!")
  location.reload();
};

  startReplay();



}


function startReplay() {
  allSquares = document.querySelectorAll(".square");

  console.log("replay started");

  let i = 0;

  function processMove() {
    if (i >= lastGameArr.length) {
      localStorage.removeItem("replaysave");
      alert("Replay Finished,Start A New Game")
      location.reload()
      
      return;
    }



    let moveType = lastGameArr[i].type;
    let actionItem;

    if (moveType == "move") {
      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].startingRow) && (c == lastGameArr[i].startingCol)) {
          actionItem = square.firstChild;
          console.log(square.firstChild)
          square.removeChild(square.firstChild);
        }
      }); 

      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].endingRow) && (c == lastGameArr[i].endingCol)) {
          console.log("inside appended forEach")
          square.appendChild(actionItem);
        }
      });
      historyContainer.innerText=lastGameArr[i].sentence;
      console.log("item moved....");
    }
     else if (moveType == "rotate") {
      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].startingRow) && (c == lastGameArr[i].startingCol)) {
          if (square.firstChild.classList.contains('flipped')) {
            square.firstChild.classList.remove('flipped');
          } else {
            square.firstChild.classList.add('flipped');
          }
        }
      });

      historyContainer.innerText=lastGameArr[i].sentence;

      console.log("item rotated....");
    }
     else if (moveType == "swap") {
      let finalItem;

      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].startingRow) && (c == lastGameArr[i].startingCol)) {
          actionItem = square.firstChild;
        }
      });

      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].endingRow) && (c == lastGameArr[i].endingCol)) {
          finalItem = square.firstChild;
          square.removeChild(square.firstChild);
          square.appendChild(actionItem);
        }
      });

      allSquares.forEach(square => {
        let r = square.dataset.row;
        let c = square.dataset.col;
        if ((r == lastGameArr[i].startingRow) && (c == lastGameArr[i].startingCol)) {
          square.appendChild(finalItem);
        }
      });
      
      historyContainer.innerText=lastGameArr[i].sentence;

      console.log("swapped item.....");
    }

    i++;
    setTimeout(processMove, 5000); // Call processMove after 5 seconds
  }

  processMove(); // Initial call to start the process
}




//history button functionality...

const historyBtn=document.querySelector("#historyBtn");
const historyContainer=document.querySelector(".historyContainer");

historyBtn.addEventListener("click",()=>{
  if((historyArr.length) && (historyBtn.innerText == 'History') ){

    historyBtn.innerText='Close History'

  historyContainer.innerHTML="<h3>History</h3>";

  historyArr.forEach(item=>{

   let line=document.createElement("p");
   line.innerText="=> "+item;

   historyContainer.appendChild(line);

  })    
  }
  else if(historyBtn.innerText == 'Close History'){
    historyBtn.innerText='History'
      historyContainer.innerHTML="";
  }
})

  

