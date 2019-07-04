const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.listen(8000, () => {
  console.log(`Running on port 8000...`);
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})



module.exports = app;