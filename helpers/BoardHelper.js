var boardA = generate2DArray();
var boardB = generate2DArray();

function generate2DArray() {
    var array = new Array(10);
    for (let i = 0; i < 10; i++) {
        array[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
            array[i][j] = 2;
        }
    }
    return array;
}

function generateNewBoard(newBoard, playersBoard) {
    for (let i = 0; i < 10; i++) {
        playersBoard[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
            playersBoard[i][j] = newBoard[i][j];
        }
    }
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
    generateNewBoard
};