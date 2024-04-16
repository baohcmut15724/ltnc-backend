import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/user.js";
import { controllers } from "../controllers/user.js";
import { verifyToken } from "../middleware.js";

export const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//   res.status(StatusCodes.OK).json({ message: "GET: testAPI thanh cong" });
// });

userRouter.post("/login", validations.login, controllers.login);

userRouter.get("/private", verifyToken, function (req, res) {
  res.status(StatusCodes.OK).json({ message: "GET: private thanh cong" });
});
