const cells = document.querySelectorAll(".cells")
const messageEl = document.querySelector(".message")
const resetBtn = document.getElementById("reset")

let currentPlayer = "X"
let running = false

let conditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options = ["", "", "","", "", "","", "", ""]

startGame()

function startGame(){
    cells.forEach(cell =>{
        cell.addEventListener("click", cellClick)
    })
    running=true
}

function cellClick(){
    let index = this.getAttribute("cellId")
    
    if(options[index] != "" || !running){
        return
    }
    
    cellUpdate(this, index) 
    checkWinner()
}

function cellUpdate(cell, index){
    options[index] = currentPlayer
    cell.innerHTML = currentPlayer
}

function changePlayer(){
    currentPlayer = (currentPlayer=="X") ? "O" : "X"
    messageEl.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
    let won = false
    for(let i = 0; i<conditions.length;i++){
        let cellA = options[conditions[i][0]] 
        let cellB = options[conditions[i][1]] 
        let cellC = options[conditions[i][2]] 

        if(cellA == cellB && cellB == cellC){
            continue
        }else if(cellA == cellB && cellB == cellC){
            won=true
            break
        }

        if(won){
            running = false
            messageEl.textContent = `${currentPlayer} Won`
        }else if(!options.includes("")){
            messageEl.textContent = "It's a draw!"
            running=false
        }else{
            changePlayer()
        }
    }
}