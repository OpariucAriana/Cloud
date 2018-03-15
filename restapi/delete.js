const sqlite3 = require('sqlite3').verbose();
 
// open a database connection
let db = new sqlite3.Database('./db/books.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

exports.deleteBook = function(bookId){
  db.run(`DELETE FROM books WHERE rowid=?`, bookId, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) deleted ${this.changes}`);
});
}

exports.deleteBooks = function(){
    db.run(`DELETE from books`, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) deleted ${this.changes}`);
});
}