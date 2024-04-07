const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'db5015641848.hosting-data.io',
    user: 'dbu3329694',
    password: 'Jonemaka6',
    database: 'dbs12770912'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM Donations';

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
            return;
        }
        res.json(results);
    });
});


app.post('/api/donations', (req, res) => {
    const { name, amount, anonymous } = req.body;

    if (!name || !amount || typeof anonymous !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input. Name, amount, and anonymous are required.' });
    }

    const insertQuery = 'INSERT INTO Donations (Name, Amount, Anonymous) VALUES (?, ?, ?)';
    const selectQuery = 'SELECT * FROM Donations';

    db.query(insertQuery, [name, amount, anonymous], (error, insertResults) => {
        if (error) {
            console.error('Error executing insert query:', error);
            return res.status(500).json({ error: 'Error creating donation.' });
        }

        db.query(selectQuery, (error, selectResults) => {
            if (error) {
                console.error('Error executing select query:', error);
                return res.status(500).json({ error: 'Error fetching donations.' });
            }

            res.json({ donations: selectResults });
        });
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


