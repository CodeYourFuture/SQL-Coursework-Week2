const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
	user: "ryanscpt",
	host: "localhost",
	database: "cyf_ecommerce",
	password: "",
	port: 5432,
});

app.get("/", (req, res) => {
	console.log("Welcome over here!");
	res.send("Welcome to the postgresql server!");
});

app.get("/customers", async (req, res) => {
	const result = await pool.query(`SELECT * FROM customers`);
	console.log(result.rows);
	res.json(result.rows);
});

app.get("/suppliers", (req, res) => {
	pool.query(`SELECT supplier_name FROM suppliers`, (err, result) => {
		console.log(result.rows);
		res.json(result.rows);
	});
});

app.get("/products", (req, res) => {
	pool.query(
		`SELECT product_name, supplier_name, unit_price 
			FROM order_items 
			INNER JOIN product_availability 
			on product_id = prod_id 
			INNER JOIN products
			on prod_id = products.id
			inner join suppliers 
			on supp_id = suppliers.id; `,
		(err, result) => {
			console.log(result.rows);
			res.json(result.rows);
		}
	);
});

const listener = app.listen(3000 || process.env.PORT, () => {
	console.log(`Server listening on ${listener.address().port}`);
});
