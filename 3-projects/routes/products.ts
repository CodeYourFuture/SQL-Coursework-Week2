import express from "express";
import { getAllProducts } from "../controllers/products";

const router = express.Router();
router.route("/").get(getAllProducts);

export default router;
