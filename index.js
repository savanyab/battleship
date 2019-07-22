const express = require('express');
const app = express();
const board = require('./helpers/BoardHelper');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
var db;
const env = process.env.NODE_ENV || 'development';
var cors = require('cors');

app.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
  db = (env === 'test') ? client.db('test') : client.db('battleship');
  if (err) return console.log(err)
  app.listen(8000, () => {
    console.log('Running on port on 8000...')
  });
});

app.use(cors());

app.get('/boards/playerA', async function (req, res) {
  const findPlayerABoard = () => {
    return new Promise((resolve, reject) => {
      db.collection('boards').find({ "player": "A" })
        .toArray(function (err, board) {
          err ? reject(err) : resolve(board);
        });
    });
  };

  const playerABoard = await findPlayerABoard();
  res.json(playerABoard);
});

app.get('/boards/playerB', async function (req, res) {
  const findPlayerBBoard = () => {
    return new Promise((resolve, reject) => {
      db.collection('boards').find({ "player": "B" })
        .toArray(function (err, board) {
          err ? reject(err) : resolve(board);
        });
    });
  };

  const playerBBoard = await findPlayerBBoard();
  res.json(playerBBoard);
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
