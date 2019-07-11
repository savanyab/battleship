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

function shoot(firstCoordinate, secondCoordinate, board) {
    let cell = board[firstCoordinate][secondCoordinate];
    if (cell == 0) {
        setCellToMissed(firstCoordinate, secondCoordinate, board);
    }
    if (cell == 1) {
        setCellToHit(firstCoordinate, secondCoordinate, board)
    }
    return board[firstCoordinate][secondCoordinate];
}

function setCellToMissed(firstCoordinate, secondCoordinate, board) {
    board[firstCoordinate][secondCoordinate] = 2;
}

function setCellToHit(firstCoordinate, secondCoordinate, board) {
    board[firstCoordinate][secondCoordinate] = 3;
}


module.exports = {
    boardA,
    boardB,
    shoot,
    generateNewBoard
};