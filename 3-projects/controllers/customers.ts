import { queryAndRespond } from "../utils/getAll";
import { Request, Response } from "express";
export const getAllCustomers = (req: Request, res: Response) =>
  queryAndRespond(res, "SELECT * from customers");
