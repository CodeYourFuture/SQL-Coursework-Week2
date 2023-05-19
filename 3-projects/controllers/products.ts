import { queryAndRespond } from "../utils/getAll";
import { Request, Response } from "express";
export const getAllProducts = (req: Request, res: Response) =>
  queryAndRespond(
    res,
    "SELECT p.id,p.product_name,pa.unit_price,s.supplier_name from products p JOIN product_availability pa ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id"
  );
