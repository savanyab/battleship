var board = new Array(10);
for (let i = 0; i < 10; i++) {
    board[i] = new Array(10);
    for (let j = 0; j < 10; j++) {
        board[i][j] = 'W';
    }
}

module.exports = board;