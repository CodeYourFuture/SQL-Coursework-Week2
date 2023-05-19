import { queryAndRespond } from "../utils/getAll";
import { Request, Response } from "express";
export const getAllSuppliers = (req: Request, res: Response) =>
  queryAndRespond(res, "SELECT * from suppliers");
