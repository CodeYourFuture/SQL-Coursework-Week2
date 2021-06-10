const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "LT",
    password: "wIsE_888",
    database: "homework",
});

// SQL queries

const supplierDeleteQuery = `DELETE FROM suppliers WHERE id = $1`;

const supplierInsertQuery = `
    INSERT INTO suppliers (supplier) VALUES ($1) RETURNING id
`;

const supplierSelectByIdQuery = `SELECT * FROM suppliers WHERE id = $1`;

const supplierUpdateQuery = `UPDATE suppliers SET supplier = $1 WHERE id = $2`;

const suppliersSelectQuery = `SELECT * FROM suppliers`;

// Error messages

const invalidSupplierMessage = {message: "Invalid supplier name"};

const supplierNotFoundMessage = {message: "Supplier not found"};

// Validators

function isValidID(id) {
    return !isNaN(id) && id >= 0;
}

function isValidSupplier(supplier) {
    // Only accept letters, numbers, white space and dash characters
    const regexp = /^[a-zA-Z0-9 -]{1,60}$/;
    return supplier.match &&  // Make sure the match method exists
        supplier.match(regexp);  // Execute regular expression matching
}

// Route handlers

app.get("/suppliers", (req, res) =>
    pool.query(suppliersSelectQuery)
        .then(result => res.send(result.rows))
        .catch(error => res.status(500).send(error))
);

app.get("/suppliers/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!isValidID(id)) {
        res.status(404).send(supplierNotFoundMessage);
    } else {
        pool.query(supplierSelectByIdQuery, [id])
            .then(result => {
                if (result.rows.length === 0) {
                    res.status(404).send(supplierNotFoundMessage);
                } else {
                    res.send(result.rows[0]);
                }
            }).catch(error => res.status(500).send(error));
    }
});

app.post("/suppliers/", (req, res) => {
    const supplier = req.body?.supplier; // req.body may be undefined

    if (!isValidSupplier(supplier)) {
        res.status(400).send(invalidSupplierMessage);
    } else {
        pool.query(supplierInsertQuery, [supplier])
            .then(result => res.status(201).send(result.rows[0]))
            .catch(error => res.status(500).send(error));
    }
});

app.put("/suppliers/:id", (req, res) => {
    const id = req.params.id;
    const supplier = req.body?.supplier; // req.body may be undefined

    if (!isValidID(id)) {
        res.status(404).send(supplierNotFoundMessage);
    } else if (!isValidSupplier(supplier)) {
        res.status(400).send(invalidSupplierMessage);
    } else {
        pool.query(supplierUpdateQuery, [supplier, id])
            .then(result => {
                if (result.rowCount === 0) {
                    res.status(404).send(supplierNotFoundMessage);
                } else {
                    res.status(204).send();
                }
            }).catch(error => res.status(500).send(error));
    }
});

app.delete("/suppliers/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!isValidID(id)) {
        res.status(404).send(supplierNotFoundMessage);
    } else {
        pool.query(supplierDeleteQuery, [id])
            .then(() => res.status(204).send())
            .catch(error => res.status(500).send(error));
    }
});

app.listen(3000, () => console.log("Listening on port 3000."));
