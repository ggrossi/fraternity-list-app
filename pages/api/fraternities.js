// pages/api/fraternities.js

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
  const db = await open({
    filename: process.env.SQLITE_DB_PATH || './database/fraternity-listing.db',
    driver: sqlite3.Database,
  });

  if (req.method === 'GET') {
    if (req.query.name) {
      const { name } = req.query;
      try {
        const fraternity = await db.get('SELECT * FROM fraternities WHERE name = ?', [name]);
        if (fraternity) {
          res.json(fraternity);
        } else {
          res.status(404).json({ error: 'Fraternity not found.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fraternity.' });
      }
    } else {
      try {
        const fraternities = await db.all('SELECT * FROM fraternities');
        res.json(fraternities);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fraternities.' });
      }
    }
  } else if (req.method === 'POST') {
    const { name, year_of_foundation, address, number_of_rooms, phone } = req.body;
    try {
      await db.run('INSERT INTO fraternities (name, year_of_foundation, address, number_of_rooms, phone) VALUES (?, ?, ?, ?, ?)', [name, year_of_foundation, address, number_of_rooms, phone]);
      res.status(201).json({ message: 'Fraternity added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add fraternity.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
