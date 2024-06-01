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
var canonBlue =  '<div class="piece tank" group="blue" char="canon"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="blue" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">canon</text>' +
'</svg></div>';
var canonRed =  '<div class="piece tank" group="red" char="canon"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="red" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">canon</text>' +
'</svg></div>';
var LineBlue = '<div class="piece line" group="blue" char="line" direction="right"><svg class="line" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<line x1="10" y1="90" x2="90" y2="10" stroke="blue" stroke-width="2"/>' +
'</svg></div>';
var LineRed = '<div class="piece line" group="red" char="line" direction="left"><svg class="line" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<line x1="10" y1="90" x2="90" y2="10" stroke="red" stroke-width="2"/>' +
'</svg></div>';
var tankRed =  '<div class="piece absorb" group="red" char="tank"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="red" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">tank</text>' +
'</svg></div>';
var tankBlue =  '<div class="piece absorb" group="blue" char="tank"><svg class="tank" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">' +
'<rect x="10" y="10" width="80" height="80" fill="blue" /><text x="50" y="55" fill="white" font-size="20" text-anchor="middle" alignment-baseline="middle">tank</text>' +
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
  gameBoard.childNodes[6].innerHTML = LineBlue;//6
  gameBoard.childNodes[3].innerHTML = canonBlue;//3
  gameBoard.childNodes[57].innerHTML = canonRed;
  gameBoard.childNodes[59].innerHTML = TriangleRed;//59
  gameBoard.childNodes[55].innerHTML = LineRed;
  gameBoard.childNodes[20].innerHTML = tankBlue;
  gameBoard.childNodes[42].innerHTML = tankRed;//42
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
  
     startTimer(newTime, display);
   
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
  resetGame();
})
function resetGame(){
  alert("Game Restarting !!!")
  clearInterval(intervalID);
  location.reload()

}


//on window load logic

window.onload=()=>{
  turnHeading.innerText=`${turn}'s Turn`;
  pauseBtn.innerText="Pause";
  // console.log(turn);
  let display=document.querySelector("#timer");
  let totalTime=60;
  startTimer(totalTime, display);
 
  allSquares.forEach(square=>{
    if(square.firstChild && square.firstChild.getAttribute("class") != "bullet"){
      if(square.firstChild.getAttribute("group") != turn){
        square.classList.add("disabled")
        square.firstChild.classList.add("disabled")
      }else{
        square.classList.remove("disabled")
        square.firstChild.classList.remove("disabled")
      }
    }  
  })
}

function updateTurn(group){
  // console.log(turn);
turnHeading.innerText=`${group}'s Turn`;

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

allSquares.forEach(square=>{
  if(square.firstChild && square.firstChild.getAttribute("class") != "bullet"){
    if(square.firstChild.getAttribute("group") != turn){
      square.classList.add("disabled")
      square.firstChild.classList.add("disabled")
    }else{
      square.classList.remove("disabled")
      square.firstChild.classList.remove("disabled")
    }
  }  
})

}



//function for highlighting neighbours

let highLightFlag=false;

function highLight(square){
let hRow=parseInt(square.dataset.row);
let hCol=parseInt(square.dataset.col);

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
     }else{
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



function dragStart(square){
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

  if(!moveFlag) return;

  let dragName=draggedElement.getAttribute("class");
  let dragGrp=draggedElement.getAttribute("group");
  

  endRow=square.dataset.row;
  endCol=square.dataset.col;
  
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

    highLightFlag=false;
    moveFlag=false;
    highLight(draggedElement.parentNode);
    clearButton();
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
   
    highLightFlag=false;
    moveFlag=false;
    highLight(draggedElement.parentNode);
    clearButton();
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
  if(dragGrp=="blue"){
    moveBulletDown();
  }else{
    moveBulletUp();
  }
  // moveBullet(dragGrp);
}

function disableDrag(){
  allSquares.forEach(square => {
    if(square.firstChild){
      square.firstChild.setAttribute('draggable',false)
    }
  })
}
function moveBulletDown(){
  let bullet=document.querySelector('.bullet');
  if (!bullet) return;
  // if (!bullet) {
  //   bullet = document.createElement("div");
  //   bullet.classList.add('bullet');
  // }
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
                        location.reload();
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
                        location.reload();
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
                        location.reload();
                  }
              else if((square.firstChild.getAttribute("char") == "triangle")){
                         // if reflecting with blue triangle
                        if(square.firstChild.getAttribute("group") == "blue"){
                            //checking orientation of triangle and send accordingly
                            if(square.firstChild.getAttribute("direction") == "right"){
                                 updateTurn(turn);
                                 moveBulletRightCalled = false;
                                 bullet.remove();
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
                        location.reload();
             }
             else if((square.firstChild.getAttribute("char") == "triangle")){
              // if reflecting with blue triangle
             if(square.firstChild.getAttribute("group") == "blue"){
                 //checking orientation of triangle and send accordingly
                 if(square.firstChild.getAttribute("direction") == "right"){
                  goDownCalled=true;
                   moveBulletRightCalled=false;
                   goDown();
                   return;
                     
                 }else{
                  updateTurn(turn);
                  moveBulletRightCalled = false;
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
                    moveBulletRightCalled=false;
                    goUp();
                    return
                }else{
                   updateTurn(turn);
                   moveBulletRightCalled = false;
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
             //if reflecting with red line
             else if(square.firstChild.getAttribute("group") == "red"){
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


//rotating the roatatable item logic
allSquares.forEach(square=>{
  if(square.firstChild){
    square.addEventListener("click",()=>{//.firstChild
      // console.log(square.firstChild)
        startRotate(square)
    })
  }
  
})

function startRotate(square){
  if(square.firstChild){
    if(square.firstChild.getAttribute("char") == "triangle" || square.firstChild.getAttribute("char") == "line" ){
      // console.log(square.firstChild)
      disableClick();
      rotateItem(square)
  }
  }

}


function rotateItem(square){
  let btn=document.createElement("button");
  btn.innerText="Rotate"
  container.appendChild(btn)
 

  btn.addEventListener("click",()=>{

    turn = turn==="red" ? "blue":"red";
    
    if (square.firstChild.classList.contains('flipped')) {
      // Class 'flipped' is present in the class list
      square.firstChild.classList.remove('flipped');
      container.removeChild(btn)
      enableClick();
      createBullet(square.firstChild.getAttribute("group"));
  } else {
      // Class 'flipped' is not present in the class list
      square.firstChild.classList.add('flipped');
      container.removeChild(btn);
      enableClick();
      createBullet(square.firstChild.getAttribute("group"));
  }

      if (square.firstChild.getAttribute("direction") == "right") {
        square.firstChild.setAttribute("direction","left")
       
      } else {
        square.firstChild.setAttribute("direction","right")
      }

      highLightFlag=false;
      highLight(draggedElement.parentNode);
  
  })

}
//clearButton
//function to remove btns
function clearButton(){
  const container = document.querySelector('.container');

  // Select all buttons within the container
const buttons = container.querySelectorAll('button');

// Iterate over the buttons to find and remove buttons with specific inner text
buttons.forEach(button => {
    if (button.innerText === 'Swap' || button.innerText === 'Rotate') {
        button.remove();
    }
});

enableClick();

}
function enableClick(){
  allSquares.forEach(square=>{
    if(square.firstChild){
      square.firstChild.style.pointerEvents = 'none';
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
            location.reload();
          } else {
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
            location.reload();
          } else {
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


