var boardA = new Array(10);
for (let i = 0; i < 10; i++) {
    boardA[i] = new Array(10);
    for (let j = 0; j < 11; j++) {
        boardA[i][j] = 0;
    }
}

var boardB = new Array(10);
for (let i = 0; i < 10; i++) {
    boardB[i] = new Array(10);
    for (let j = 0; j < 11; j++) {
        boardB[i][j] = 'B';
    }
}

const values = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10
}

function shootToCoordinates(letterCoordinate, numberCoordinate, board) {
    letterCoordinateValue = values[letterCoordinate];
    let cell = board[numberCoordinate-1][letterCoordinateValue];
    if (cell == 0) {
        boardA[numberCoordinate-1][letterCoordinateValue] = 2;
    }
    if (cell == 1) {
        boardA[numberCoordinate-1][letterCoordinateValue] = 3;
    }
}

module.exports = {
    boardA,
    boardB,
    shootToCoordinates
};