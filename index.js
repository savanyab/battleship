const express = require('express');
const app = express();
const board = require('./helpers/BoardHelper');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
var db;
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
  console.log(env)
  db = (env === 'test') ? client.db('test') : client.db('battleship');
  if (err) return console.log(err)
  app.listen(8000, () => {
    console.log('Running on port on 8000...')
  });
});

app.get('/boards/playerA', function (req, res) {
  db.collection('boards').findOne({ "player": "A" })
    .then((playerABoard) => { res.json(playerABoard) });
});

app.get('/boards/playerB', function (req, res) {
  db.collection('boards').findOne({ "player": "B" })
    .then((playerBBoard) => { res.json(playerBBoard) });
});

app.post('/boards/playerA/shoot', function (req, res) {
  let cell = board.shoot(req.body.x, req.body.y, board.boardA);
  db.collection('boards').updateOne({
    "player": "A"
  },
    {
      $set: {
        "board": board.boardA
      }
    });
  let isHit = (cell == 3);
  res.json({"hit": isHit});
});

app.post('/boards/playerB/shoot', function (req, res) {
  let cell = board.shoot(req.body.x, req.body.y, board.boardB);
  db.collection('boards').updateOne({
    "player": "B"
  },
    {
      $set: {
        "board": board.boardB
      }
    });
  let isHit = (cell == 3);
  res.json({"hit": isHit});
});

app.put('/boards/playerA', function (req, res) {
  board.generateNewBoard(req.body, board.boardA);
  db.collection('boards').updateOne({
    "player": "A"
  },
    {
      $set: {
        "board": board.boardA
      }
    }).then(() => res.json(board.boardA));
});

app.put('/boards/playerB', function (req, res) {
  board.generateNewBoard(req.body, board.boardB);
  db.collection('boards').updateOne({
    "player": "B"
  },
    {
      $set: {
        "board": board.boardB
      }
    }).then(() => res.json(board.boardB));
});

module.exports = app;
