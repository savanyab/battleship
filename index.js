const express = require('express');
const app = express();
const playerABoard = require('./helpers/BoardHelper')

app.set('views', './views');
app.set('view engine', 'jade');

app.listen(8000, () => {
  console.log(`Running on port 8000...`);
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Battleship' })
});

app.get('/boards/playerA', function (req, res) {
  res.render('playerABoard', {board: playerABoard});
});

app.get('/boards/playerB', function (req, res) {
  // TODO
});

app.post('/boards/playerA/shoot', function (req, res) {
  // TODO 
  res.send('hello')
});

app.post('/boards/playerB/shoot', function (req, res) {
  // TODO
});

app.put('/boards/playerA', function (req, res) {
  // TODO
});

app.put('/boards/playerB', function (req, res) {
  // TODO
});
