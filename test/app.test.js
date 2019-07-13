const request = require('supertest');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
var db;
var app = require('../index');
var board = require('../helpers/BoardHelper');
var expect = require('chai').expect;

var boardA;
var boardB;
const testBoard = [
  [0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 1, 1]
]

describe('Battleship API', function () {
  this.timeout(5000)
  before(function (done) {
    boardA = board.generate2DArray();
    boardB = board.generate2DArray();
    MongoClient.connect(url, (err, client) => {
      db = client.db('test');
      if (err) return console.log(err)
      db.createCollection('boards')
        .then(function () {
          done()
        });
    })
  });

  beforeEach(function (done) {
    db.collection("boards").deleteMany({}).then(function () {
      db.collection('boards').insertMany([
        { "player": "A", "board": boardA },
        { "player": "B", "board": boardB }
      ]);
    }).then(function () { done() });
  });

  after(function (done) {
    db.collection("boards").drop()
      .then(function () {
        done();
      });
  });

  describe('GET /boards/playerA', function () {
    it('should respond with player A\'s board in json', function (done) {
      request(app)
        .get('/boards/playerA')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          db.collection('boards').findOne({ "player": "A" })
            .then((playerADoc) => {
              for (let i = 0; i < res.body.board.length; i++) {
                for (let j = 0; j < res.body.board[i].length; j++) {
                  expect(res.body.board[i][j]).to.equal(playerADoc.board[i][j]);
                }
              }
            });
          expect(res.body.player).to.equal("A");
          done();
        });
    });
  });

  describe('GET /boards/playerB', function () {
    it('should respond with player B\'s board in json', function (done) {
      request(app)
        .get('/boards/playerB')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          db.collection('boards').findOne({ "player": "B" })
            .then((playerBDoc) => {
              for (let i = 0; i < res.body.board.length; i++) {
                for (let j = 0; j < res.body.board[i].length; j++) {
                  expect(res.body.board[i][j]).to.equal(playerBDoc.board[i][j]);
                }
              }
            });
          expect(res.body.player).to.equal("B");
          done();
        });
    });
  });

  describe('POST /boards/playerA/shoot', function () {
    it('should change cell 2:3 to missed on player A\'s board', function (done) {
      request(app)
        .post('/boards/playerA/shoot')
        .set('Accept', 'application/json')
        .send({ "x": 2, "y": 3 })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(res.body)
          expect(res.body.hit).to.equal(false);
          db.collection('boards').findOne({ "player": "A" })
            .then((playerADoc) => {
              console.log(playerADoc.board)
              expect(playerADoc.board[2][3]).to.equal(2);
            });
          done();
        });
    });

    it('should change cell 0:0 to hit on player A\'s board', function (done) {
      request(app)
        .post('/boards/playerA/shoot')
        .set('Accept', 'application/json')
        .send({ "x": 0, "y": 0 })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(res.body)
          expect(res.body.hit).to.equal(true);
          db.collection('boards').findOne({ "player": "A" })
            .then((playerADoc) => {
              console.log(playerADoc.board)
              expect(playerADoc.board[0][0]).to.equal(3);
            });
          done();
        });
    });
  });

  describe('POST /boards/playerB/shoot', function () {
    it('should change cell 2:3 to missed on player B\'s board', function (done) {
      request(app)
        .post('/boards/playerB/shoot')
        .set('Accept', 'application/json')
        .send({ "x": 2, "y": 3 })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(res.body)
          expect(res.body.hit).to.equal(false);
          db.collection('boards').findOne({ "player": "B" })
            .then((playerBDoc) => {
              console.log(playerBDoc.board)
              expect(playerBDoc.board[2][3]).to.equal(2);
            });
          done();
        });
    });

    it('should change cell 0:0 to hit on player B\'s board', function (done) {
      request(app)
        .post('/boards/playerB/shoot')
        .set('Accept', 'application/json')
        .send({ "x": 0, "y": 0 })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(res.body)
          expect(res.body.hit).to.equal(true);
          db.collection('boards').findOne({ "player": "B" })
            .then((playerBDoc) => {
              console.log(playerBDoc.board)
              expect(playerBDoc.board[0][0]).to.equal(3);
            });
          done();
        });
    });
  });

  describe('PUT /boards/playerA', function () {
    it('should change player A\'s board to testBoard', function (done) {
      request(app)
        .put('/boards/playerA')
        .set('Accept', 'application/json')
        .send({ "board": testBoard })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          db.collection('boards').findOne({ "player": "A" })
            .then((playerADoc) => {
              for (let i = 0; i < res.body.length; i++) {
                for (let j = 0; j < res.body[i].length; j++) {
                  expect(playerADoc.board[i][j]).to.equal(testBoard[i][j]);
                  expect(res.body[i][j]).to.equal(playerADoc.board[i][j]);
                }
              }
            });
          done();
        });
    });
  });

  describe('PUT /boards/playerB', function () {
    it('should change player B\'s board to testBoard', function (done) {
      request(app)
        .put('/boards/playerB')
        .set('Accept', 'application/json')
        .send({ "board": testBoard })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          db.collection('boards').findOne({ "player": "B" })
            .then((playerBDoc) => {
              for (let i = 0; i < res.body.length; i++) {
                for (let j = 0; j < res.body[i].length; j++) {
                  expect(playerBDoc.board[i][j]).to.equal(testBoard[i][j]);
                  expect(res.body[i][j]).to.equal(playerBDoc.board[i][j]);
                }
              }
            });
          done();
        });
    });
  });
});

