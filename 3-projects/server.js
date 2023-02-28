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

app.get('/customers', (req, res) => {
	db.query('SELECT * FROM customers', (error, result) => {
		res.json(result.rows);
	});
});

app.listen(8080, () => {
	console.log('Server is listening on port 8080. Ready to accept requests!');
});
