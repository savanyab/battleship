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

app.post('/boards/playerA/shoot', async function (req, res) {
  let cell = board.shoot(req.body.x, req.body.y, board.boardA);
  const updateCell = () => {
    return db.collection('boards').updateOne({
      "player": "A"
    },
      {
        $set: {
          "board": board.boardA
        }
      });
  }
  const updateResult = await updateCell();

  let isHit = (cell == 3);
  res.json({ "hit": isHit, "update's result": updateResult });
});

app.post('/boards/playerB/shoot', async function (req, res) {
  let cell = board.shoot(req.body.x, req.body.y, board.boardB);
  const updateCell = () => {
    return db.collection('boards').updateOne({
      "player": "B"
    },
      {
        $set: {
          "board": board.boardB
        }
      });
  }
  const updateResult = await updateCell();

  let isHit = (cell == 3);
  res.json({ "hit": isHit, "update's result": updateResult });
});

app.put('/boards/playerA', async function (req, res) {
  board.generateNewBoard(req.body, board.boardA);
  const updateBoard = () => {
    return db.collection('boards').updateOne({
      "player": "A"
    },
      {
        $set: {
          "board": board.boardA
        }
      })
  }
  const updateResult = await updateBoard();
  res.json({ "new board": board.boardA, "update's result": updateResult });
});

app.put('/boards/playerB', async function (req, res) {
  board.generateNewBoard(req.body, board.boardB);
  const updateBoard = () => {
    return db.collection('boards').updateOne({
      "player": "B"
    },
      {
        $set: {
          "board": board.boardB
        }
      })
  }
  const updateResult = await updateBoard();
  res.json({ "new board": board.boardB, "update's result": updateResult });
});

module.exports = app;
