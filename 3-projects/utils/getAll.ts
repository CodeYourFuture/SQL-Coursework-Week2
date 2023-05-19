import express, { Express, Request, Response } from "express";
import { client } from "../server";
export const queryAndRespond = async (res: Response, sql: string) => {
  try {
    const result = await client.query(sql);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
