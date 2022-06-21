const express = require("express");
const app = express();

app.use(express.json());

const { Pool } = require("pg");

const port = process.env.PORT || 5000;

const pool = new Pool({
  // give your username
  user: "postgres",
  host: "localhost",
  // change the database name accordingly
  database: "cyf_commerce",
  password: "",
  // Port number
  port: 5432,
});

// GET ALL THE CUSTOMERS
app.get("/customers", function (request, response) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

// GET ALL THE SUPPLIERS
app.get("/suppliers", function (request, response) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

// ADVANCED LEVEL
app.get("/products", function (request, response) {
  pool
    .query(
      `SELECT products.product_name AS product, product_availability.unit_price AS price, suppliers.supplier_name AS supplier
        FROM product_availability
        JOIN products
        ON products.id = product_availability.prod_id
        JOIN suppliers
        ON suppliers.id = product_availability.supp_id`
    )
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

app.get("/hotels", function (request, response) {
  pool
    .query("SELECT * FROM hotels")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

app.get("/hotels/:hotelId", function (request, response) {
  const hotelId = Number(request.params.id);
  console.log(!Number.isInteger(hotelId));
  console.log(hotelId <= 0);

  if (!Number.isInteger(hotelId) || hotelId <= 0) {
    return response
      .status(400)
      .send(
        "The hotel ID must be a positive integer. Found " +
          request.params.hotelId
      );
  }

  pool
    .query("SELECT * FROM hotels WHERE id=$1", [hotelId])
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

app.get("/customers/:custId/bookings", function (request, response) {
  const custId = Number(request.params.custId);
  console.log(request.params);
  console.log(JSON.stringify(request.params));
  if (!Number.isInteger(custId) || custId <= 0) {
    return response
      .status(400)
      .send(
        "The customer ID must be a positive integer. Found " +
          request.params.custId
      );
  }

  pool
    .query(
      "SELECT checkin_date, nights, hotels.name, hotels.postcode FROM bookings JOIN hotels ON hotel_id = hotels.id WHERE customer_id = $1",
      [custId]
    )
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

app.get("/customers/:custId", function (request, response) {
  const custId = Number(request.params.id);

  if (!Number.isInteger(custId) || custId <= 0) {
    return response
      .status(400)
      .send(
        "The customer ID must be a positive integer. Found " +
          request.params.custId
      );
  }

  pool
    .query("SELECT * FROM customers WHERE id=$1", [custId])
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

// app.get("/", (request, response) => {
//   return response.send("Hello");
// });

app.post("/hotels", function (request, response) {
  const newHotelName = request.body.name;
  const newHotelRooms = request.body.rooms;
  const newHotelPostcode = request.body.postcode;

  console.log(newHotelName, newHotelRooms, newHotelPostcode);
  if (!Number.isInteger(newHotelRooms) || newHotelRooms <= 0) {
    return response
      .status(400)
      .send(
        "The number of rooms should be a positive integer. Found " +
          request.body.rooms
      );
  }

  pool
    .query("SELECT * FROM hotels WHERE name=$1", [newHotelName])
    .then((result) => {
      if (result.rows.length > 0) {
        return response
          .status(400)
          .send("An hotel with the same name already exists!");
      } else {
        const query =
          "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";
        pool
          .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
          .then(() => response.send("Hotel created!"))
          .catch((error) => {
            console.error(error);
            response.status(500).json(error);
          });
      }
    });
});

app.listen(port, () => console.log("Your Server is Running"+port));
