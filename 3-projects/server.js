const express = require('express');
const { Pool } = require('pg');

const app = express();

const db = new Pool({
	user: 'dbEcom',
	host: 'localhost',
	database: 'cyf_ecommerce',
	password: '',
	port: 5432,
});

app.get('/', function (req, res) {
    res.send('Welcome!!!');
});

app.get('/customers', function (req, res) {
    db.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
})

app.get('/suppliers', function (req, res) {
    db.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
})

app.listen(5000, () => {
	console.log('Server is listening on port 5000. Ready to accept requests!');
});
