import express from "express";
import { testRouter } from "./testRouter.js";

export const router = express.Router();

router.use("/testAPI", testRouter);
