import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/manager.js";
import { controllers } from "../controllers/manager.js";
import { verifyTokenAdmin } from "../middleware.js";

export const managerRouter = express.Router();

managerRouter.use(verifyTokenAdmin);

managerRouter.post("/create", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "POST: create manager thanh cong" });
});
