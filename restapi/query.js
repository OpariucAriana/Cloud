const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/books.db');
 
exports.getAllBooks = function() {
	var bookList='';
	db.each("SELECT rowid AS id, name FROM books", function(err, row) {
		console.log(row.id + ": " + row.name);
	});
}

exports.getBook = function(argument, fn) {
 	let sql = `SELECT rowid AS id, name FROM books
           WHERE rowid  = ?`;
	let bookId = argument;
 
// first row only
	db.get(sql, [bookId], (err, row) => {
		if (err) {
			fn(400);
            return
		}
        console.log(row)
        if (row != undefined)
        {
            finalData = row.name;
            fn(finalData);
            return;
        }
        fn(404);
        return
	});
}


/*getAllBooks();
getBook(2);*/