import express from "express";
import { testRouter } from "./testRouter.js";
import { userRouter } from "./user.js";
import { carRouter } from "./car.js";
import { tripRouter } from "./trip.js";

export const router = express.Router();

router.use("/testAPI", testRouter);

router.use("/user", userRouter);

router.use("/car", carRouter);

router.use("/trip", tripRouter);
