const cells = document.querySelectorAll("#cell");
const winningMessage = document.getElementById("result");
const X_MARK = "x";
const CIRCLE_MARK = "circle";
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let turn;


cells.forEach(cell => {
    cell.addEventListener("click", clicking, { once: true})
})

function clicking(e){
    const cell = e.target;
    const currentClass = turn ? CIRCLE_MARK : X_MARK;
    marking(cell, currentClass); 
    if(winner(currentClass)){
        endGame(false);        
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
    swapTurn();
    }

}

function endGame(result){
    if(result){
        winningMessage.innerText = "Draw!";
    }
    else{
        winningMessage.innerText = `${turn ? "O" : "X"} Winner!`
    }
    winningMessage.classList.add("show");
}
function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(X_MARK) || cell.classList.contains(CIRCLE_MARK);
    })
}

function marking(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurn(){
    turn = !turn;
}

function winner(currentClass){
    return combinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}