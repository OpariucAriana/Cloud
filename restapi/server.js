var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser')

var query = require("./query.js");
var insert = require("./insert.js");
var deleteCommands = require("./delete.js");

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

var express = require('express');
var app = express();
app.use(bodyParser.text({ type: 'text/plain' }));

app.post('/books', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  nameArray = req.body.split(",")
  res.send(insert.insertBooks(nameArray));
})

app.put('/books', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  idArrays = req.body.split(";")
  idArray = idArrays[0].split(",");
  nameArray = idArrays[1].split(",");
  console.log(idArrays[1]);
  res.send(insert.updateBooks(idArray,nameArray));
})

app.put('/books/:id', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  res.send(insert.updateInsertBook(req.params.id, req.body));
})

app.delete('/books', function (req, res){
	res.send(deleteCommands.deleteBooks());
})

app.delete('/books/:id', function (req, res){
	res.send(deleteCommands.deleteBook(req.params.id));
})

app.get('/books', function (req, res) {
    res.send(query.getAllBooks());
});

app.get('/books/:id', function (req, res) {
  query.getBook(req.params.id, x = function(response)
{
    res.send(response);

});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});