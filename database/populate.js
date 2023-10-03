// database/importData.js

const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/fraternity-listing.db');

fs.createReadStream('./database/fraternities_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.run('INSERT INTO fraternities (name, year_of_foundation, address, number_of_rooms, phone) VALUES (?, ?, ?, ?, ?)', [row.name, row.year_of_foundation, row.address, row.number_of_rooms, row.phone]);
  })
  .on('end', () => {
    console.log('CSV file successfully processed and data imported.');
    db.close();
  });
