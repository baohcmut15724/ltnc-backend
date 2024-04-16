import express from "express";
import { testRouter } from "./testRouter.js";
import { userRouter } from "./user.js";

export const router = express.Router();

router.use("/testAPI", testRouter);

router.use("/user", userRouter);
