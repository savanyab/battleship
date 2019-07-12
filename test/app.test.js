const request = require('supertest');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
var db;
var app = require('../index');
var board = require('../helpers/BoardHelper');
var expect = require('chai').expect;

describe('Battleship API', function () {
  var boardA;
  var boardB;
  before(function (done) {
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
    boardA = board.generate2DArray();
    boardB = board.generate2DArray();
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
          console.log(res.body)
          for (let i = 0; i < res.body.board.length; i++) {
            for (let j = 0; j < res.body.board[i].length; j++) {
              expect(res.body.board[i][j]).to.equal(boardA[i][j])
            }
          }
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
          console.log(res.body)
          for (let i = 0; i < res.body.board.length; i++) {
            for (let j = 0; j < res.body.board[i].length; j++) {
              expect(res.body.board[i][j]).to.equal(boardB[i][j])
            }
          }
          expect(res.body.player).to.equal("B");
          done();
        });
    });    
  });
});