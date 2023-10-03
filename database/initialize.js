// initialize-db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/fraternity-listing.db');

db.serialize(() => {
  // Create the fraternities table
  db.run(`
    CREATE TABLE IF NOT EXISTS fraternities (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      year_of_foundation TEXT,
      address TEXT,
      number_of_rooms INTEGER,
      phone TEXT
    )
  `);

  console.log('Database initialized successfully!');
});

db.close();
