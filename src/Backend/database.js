// database.js
const sqlite3 = require('sqlite3').verbose(); // Use verbose for more detailed logs

// Define the database file path
const DBSOURCE = "mydatabase.db";

// Connect to/create the SQLite database file
// OPEN_READWRITE: Opens the database for reading and writing.
// OPEN_CREATE: Creates the database file if it does not exist.
const db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        // Cannot open database
        console.error('Error opening database:', err.message);
        throw err; // Exit the process if DB connection fails
    } else {
        console.log('Connected to the SQLite database.');
        // Create the table if it doesn't exist
        // Use 'TEXT' for strings, 'INTEGER' for whole numbers, 'REAL' for decimals
        // 'NOT NULL' ensures a value must be provided
        // 'PRIMARY KEY AUTOINCREMENT' creates a unique ID for each row
        db.run(`CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE, -- Ensure emails are unique
            message TEXT,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                // Table already created or other error
                console.error("Error creating table:", err.message);
            } else {
                console.log("Table 'submissions' ready or already exists.");
                // You could add some initial data here if needed for testing
            }
        });
    }
});

// Export the database connection object
module.exports = db;