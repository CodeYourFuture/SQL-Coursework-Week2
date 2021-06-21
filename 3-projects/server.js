const express = require('express');
const app = express();
const { Pool, DatabaseError } = require('pg');
require('dotenv').config();

const myPass = process.env.PASSWORD;
const myUser = process.env.USERNAME;
const PORT = process.env.PORT || 3000;

const pool = new Pool({
	user: myUser,
	password: myPass,
	host: 'localhost',
	database: 'cyf_ecommerce',
	port: 5432
})

app.get('/customers', (req, res) => {
	pool.query('SELECT * FROM customers', (dbError, dbResult) => {
		console.table(dbResult.rows);
		res.json(dbResult.rows)
	})
})

app.get('/suppliers', (req, res) => {
	pool.query('SELECT * FROM suppliers', (dbError, dbResult) => {
		console.table(dbResult.rows);
		res.json(dbResult.rows);
	})
})
















app.listen(PORT, () => console.log(`This server is running on ${PORT}`));