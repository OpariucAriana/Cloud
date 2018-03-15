const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('./db/books.db');
 
db.run('CREATE TABLE books(name text)');
 
db.close();