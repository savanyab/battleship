var boardA = new Array(10);
for (let i = 0; i < 10; i++) {
    boardA[i] = new Array(10);
}

var boardB = new Array(10);
for (let i = 0; i < 10; i++) {
    boardB[i] = new Array(10);
}

function generateBoard(cells) {
    
}

function shoot(letterCoordinate, numberCoordinate, board, player) {
    
}

function setPlayersCellToMissed(board, firstCoordinate, secondCoordinate) {    
        board[secondCoordinate][firstCoordinate] = 2;  
    }

function setPlayersCellToHit(board, firstCoordinate, secondCoordinate) {
    board[secondCoordinate][firstCoordinate] = 3;
}


module.exports = {
    boardA,
    boardB,
    shoot,
    generateBoard
};