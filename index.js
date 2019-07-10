const express = require('express');
const app = express();
const board = require('./helpers/BoardHelper');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'jade');

app.listen(8000, () => {
  console.log(`Running on port 8000...`);
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Battleship' })
});

app.get('/boards/playerA', function (req, res) {
  res.render('playerBoard', {board: board.boardA, boardTitle: 'Player A\'s board'});
});

app.get('/boards/playerB', function (req, res) {
  res.render('playerBoard', {board: board.boardB, boardTitle: 'Player B\'s board'});
});

app.post('/boards/playerA/shoot', function (req, res) {
  const letterCoordinate = req.body.letterCoordinate;
  const numberCoordinate = req.body.numberCoordinate;
  const boardA = board.boardA;
  const playerA = 'A';
    board.shoot(letterCoordinate, numberCoordinate, boardA, playerA);
    res.render('playerBoard', { board: boardA, boardTitle: 'Player A\'s board' });  
});

app.post('/boards/playerB/shoot', function (req, res) {
  const letterCoordinate = req.body.letterCoordinate;
  const numberCoordinate = req.body.numberCoordinate;
  const boardB = board.boardB;
  const playerB = 'B';
  board.shoot(letterCoordinate, numberCoordinate, boardB, playerB);
    res.render('playerBoard', { board: boardB, boardTitle: 'Player B\'s board' });
});

app.put('/boards/playerA', function (req, res) {
  board.generateBoard(req.body, 'A');
  res.render('playerBoard', { board: board.boardA, boardTitle: 'Player A\'s board' });
});

app.put('/boards/playerB', function (req, res) {
  board.generateBoard(req.body, 'B');
  res.render('playerBoard', { board: board.boardB, boardTitle: 'Player B\'s board' });
});
