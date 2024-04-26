import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/testValidation.js";
import { controllers } from "../controllers/testController.js";
import { models } from "../models/testModel.js";

export const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET: testAPI thanh cong" });
});

testRouter.post("/", validations.create, controllers.create);

testRouter.post("/tao", models.tao);

testRouter.post("/taoxe", models.taoXe);
