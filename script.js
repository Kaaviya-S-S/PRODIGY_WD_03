const vsButtons = document.querySelector('.vs-button');
const twoPlayers = document.getElementById('twoPlayers');
const vsComputer = document.getElementById('vsComputer');
const twoPlayersSection = document.querySelector('.two-players');
const vsComputerSection = document.querySelector('.vs-computer');
const restartButton = document.getElementById('restartButton');
const choice = document.querySelector('.choice');

function twoPlayerGame() {
    twoPlayersSection.style.display="";
    vsComputerSection.remove();      //since 2 player game, remove the vs-computer part of code!
    vsButtons.style.display = "none";  //now hide those vs-buttons
    restartButton.style.display = "";
    choice.style.display = "none"; 
}
twoPlayers.addEventListener('click',twoPlayerGame);     //if 2-players mode clicked, call that function


function vsComputerGame() {
    vsComputerSection.style.display="";
    twoPlayersSection.remove();      //since vs-comp. game, remove the 2-player part of code!
    vsButtons.style.display = "none";  //now hide those vs-buttons
    restartButton.style.display = "";
    choice.style.display = "none"; 
}
vsComputer.addEventListener('click',vsComputerGame);     //if vs-comp. mode clicked, call that function


let currentPlayer = 'X';
let board = [['','',''], ['','',''], ['','','']];
let gameOver = false;


function twoPMakeMove(row, col) {
    if(!gameOver && board[row][col]===''){
        board[row][col] = currentPlayer;
        let cell = `.row:nth-child(${row+1}) .cell:nth-child(${col+1})`
        document.querySelector(cell).textContent = currentPlayer;

        if(checkWin()){
            /* document.getElementById('twoPlayersWinnerText').textContent = `${currentPlayer} Wins!`; */
            document.getElementById('twoPlayersWinnerText').innerHTML = `${currentPlayer} Wins! <i class="fas fa-trophy"></i> `;
            gameOver = true;
        }

        else if(checkTie()){
            document.getElementById('twoPlayersWinnerText').textContent = "It's a Tie!";
            gameOver = true;
        }

        else{
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function vsCompMakeMove(row, col) {
    if(!gameOver && board[row][col]===''){
        board[row][col] = currentPlayer;
        let cell = `.row:nth-child(${row+1}) .cell:nth-child(${col+1})`
        document.querySelector(cell).textContent = currentPlayer;

        let winner;

        if (checkWin()){
            if(currentPlayer==='X'){
                winner = 'Player'
            } 
            else {
                winner = 'Computer'
            }
            /* document.getElementById('vsComputerWinnerText').textContent = `${winner} Wins!`; */
            document.getElementById('vsComputerWinnerText').innerHTML = `${winner} Wins! <i class="fas fa-trophy"></i>`
            gameOver = true;
        }

        else if (checkTie()){
            document.getElementById('vsComputerWinnerText').textContent = "It's a Tie!";
            gameOver = true;
        }

        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if(!gameOver && currentPlayer === 'O'){
                setTimeout(makeComputerMove,500);  //executte after 0.5 secs
            }
        }
    }
}



function makeComputerMove(){
    if(!gameOver){
        let row, col;
        do {
            row = Math.floor(Math.random()*3);
            col = Math.floor(Math.random()*3);
        } while (board [row][col] !== '');       //do until we find a free box
    
        vsCompMakeMove(row,col);
    }
}


function checkWin(){
    for(let i=0; i<3; i++){
        if((board[i][0]===currentPlayer && board[i][1]===currentPlayer && board[i][2]===currentPlayer) ||
           (board[0][i]===currentPlayer && board[1][i]===currentPlayer && board[2][i]===currentPlayer)) {
            return true;
        }
    }    

    if((board[0][0]===currentPlayer && board[1][1]===currentPlayer && board[2][2]===currentPlayer) ||
        (board[0][2]===currentPlayer && board[1][1]===currentPlayer && board[2][0]===currentPlayer)) {
        return true;
    }

    return false;
}


function checkTie(){
    let row;
    for(row of board){
        if(row.includes('')){
            return false;
        }
    }
    return true;
}



function restartGame() {
    location.reload();     //refresh and start from first
}
restartButton.addEventListener('click', restartGame);