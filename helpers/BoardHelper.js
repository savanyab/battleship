var boardA = new Array(10);
for (let i = 0; i < 10; i++) {
    boardA[i] = new Array(10);
    for (let j = 0; j < 11; j++) {
        boardA[i][j] = 'A';
    }
}

var boardB = new Array(10);
for (let i = 0; i < 10; i++) {
    boardB[i] = new Array(10);
    for (let j = 0; j < 11; j++) {
        boardB[i][j] = 'B';
    }
}

module.exports = {
    boardA,
    boardB
};