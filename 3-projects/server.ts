import express, { Express, Response } from "express";
import { Client } from "pg";
import customerRoutes from "./routes/customers";
import productRoutes from "./routes/products";
import supplierRoutes from "./routes/supplierts";
import { clientConfig } from "./utils/clientConfig";

const app: Express = express();

export const client = new Client(clientConfig);
client.connect();

app.use("/customers", customerRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
