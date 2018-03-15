const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('./db/books.db');
  
insertBook = function(bookName){
  db.run(`INSERT INTO books(name) VALUES(?)`, [bookName], function(err) {
    if (err) {
      return console.log(err.message);
    }
  // get the last insert id
  console.log('A row has been inserted with name '+ bookName);
  });
}

insertBookWithId = function(bookId, bookName){
  db.run(`INSERT INTO books(rowid,name) VALUES(?,?)`, [bookId, bookName], function(err) {
    if (err) {
      return console.log(err.message);
    }
  // get the last insert id
  console.log('A row has been inserted with name '+ bookName);
  });
}

updateBook = function(bookId, bookName){
  data = [bookName, bookId];
  let sql = "UPDATE books set name=? where rowid=?";
  db.run(sql, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
}

exports.insertBooks = function(bookNames){
  var stmt = db.prepare("INSERT INTO books(name) VALUES (?)");
    for (var i = 0; i < bookNames.length; i++)
    {
      stmt.run("book " + bookNames[i]);
    }
    stmt.finalize();
}

exports.updateBooks = function(bookIds, bookNames) { 
  for (var i= 0; i < bookIds.length; i++)
  {
    updateBook(bookIds[i], bookNames[i]);
  }
}

exports.updateInsertBook = function(bookId, bookName){
  let sql = `SELECT rowid AS id, name FROM books
             WHERE rowid  = ?`;
  // first row only
    db.get(sql, [bookId], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row
      ? updateBook(bookId, bookName)
      : insertBookWithId(bookId, bookName);
    });
}