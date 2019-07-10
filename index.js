const express = require('express');
const app = express();
const board = require('./helpers/BoardHelper');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log(`Running on port 8000...`);
});

app.get('/', function (req, res) {
});

app.get('/boards/playerA', function (req, res) {
});

app.get('/boards/playerB', function (req, res) {
});

app.post('/boards/playerA/shoot', function (req, res) {
});

app.post('/boards/playerB/shoot', function (req, res) {
});

app.put('/boards/playerA', function (req, res) {
});

app.put('/boards/playerB', function (req, res) {
});
