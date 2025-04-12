// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default

// --- Middleware ---
// Enable CORS for all origins (adjust in production for security)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for traditional HTML forms)
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// GET: Simple check to see if the server is running
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Form Submission API!" });
});

// POST: Handle form submissions
app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body; // Extract data from request body

    // --- Basic Input Validation ---
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required fields." });
        // You might want more robust validation (e.g., email format)
    }

    // --- Database Insertion ---
    const sql = `INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)`;
    const params = [name, email, message || '']; // Use params array to prevent SQL Injection

    db.run(sql, params, function(err) { // Use `function` to access `this.lastID`
        if (err) {
            console.error("Database insertion error:", err.message);
            // Handle specific errors like UNIQUE constraint violation (duplicate email)
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: "Email already submitted." }); // 409 Conflict
            }
            // Generic server error
            return res.status(500).json({ error: "Could not save submission." });
        }

        // --- Success Response ---
        console.log(`New submission added with ID: ${this.lastID}`);
        res.status(201).json({ // 201 Created
            message: "Submission successful!",
            data: {
                id: this.lastID, // Return the ID of the newly created row
                name: name,
                email: email,
                message: message || ''
            }
        });
    });
});

// GET: Optionally retrieve all submissions (for testing/admin)
app.get('/api/submissions', (req, res) => {
    const sql = "SELECT * FROM submissions ORDER BY submitted_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Database retrieval error:", err.message);
          res.status(500).json({ error: "Could not retrieve submissions." });
          return;
        }
        res.json({
          message: "success",
          data: rows
        });
    });
});


// --- Global Error Handler (Optional but Recommended) ---
// Catches errors from routes that might not have specific handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown (optional, handles Ctrl+C)
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});