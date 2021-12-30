const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
	user: 'ivanzhukov',
	host: 'localhost',
	database: 'cyf_ecommerce',
	password: '',
	port: 5432,
});

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Server started on port ', PORT);
});

app.get('/', (req, res) => {
	res.status(200).send('OK!');
});

app.get('/customers', (req, res) => {
	pool.query('select * from customers').then((result) => {
		res.status(200).json(result.rows);
	});
});

app.get('/suppliers', (req, res) => {
	pool.query('select * from suppliers').then((result) => {
		res.status(200).json(result.rows);
	});
});

app.get('/products', (req, res) => {
	pool
		.query(
			`select 
				products.product_name, 
				product_availability.unit_price, 
				suppliers.supplier_name
					from products
						join product_availability on product_availability.prod_id = products.id
						join suppliers on product_availability.supp_id = suppliers.id`
		)
		.then((result) => {
			res.status(200).json(result.rows);
		});
});
