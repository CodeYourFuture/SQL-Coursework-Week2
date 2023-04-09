import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Client } from "pg";
dotenv.config();
const app: Express = express();

type ClientType = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
  ssl: { rejectUnauthorized: boolean };
};
const clientConfig: ClientType = {
  user: process.env.user!,
  host: process.env.host!,
  database: process.env.database!,
  password: process.env.password!,
  port: +process.env.port!,
  ssl: {
    rejectUnauthorized: false,
  },
};
const client = new Client(clientConfig);

client.connect();
const queryAndRespond = async (res: Response, sql: string) => {
  try {
    const result = await client.query(sql);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
app.get("/customers", (req: Request, res: Response) =>
  queryAndRespond(res, "SELECT * from customers")
);
app.get("/suppliers", (req: Request, res: Response) =>
  queryAndRespond(res, "SELECT * from suppliers")
);
app.get("/products", (req: Request, res: Response) =>
  queryAndRespond(
    res,
    "SELECT p.id,p.product_name,pa.unit_price,s.supplier_name from products p JOIN product_availability pa ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id"
  )
);
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
