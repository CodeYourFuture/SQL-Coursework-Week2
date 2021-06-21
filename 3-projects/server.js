const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();

const myPass = process.env.PASSWORD;
const myUser = process.env.USERNAME;
const myHost = process.env.HOST;
const myDatabase = process.env.DATABASE;
const myDB_Port = process.env.DB_PORT;
const PORT = process.env.PORT || 3000;

const pool = new Pool({
	user: myUser,
	password: myPass,
	host: myHost,
	database: myDatabase,
	port: myDB_Port
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

app.get('/products', (req, res) => {
	pool.query('SELECT supplier_name, product_name FROM products INNER JOIN product_availability ON products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id;',
		(dbError, dbResult) => {
			res.json(dbResult.rows);
		})
})














app.listen(PORT, () => console.log(`This server is running on ${PORT}`));