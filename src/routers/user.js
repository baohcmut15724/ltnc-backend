import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/user.js";
import { controllers } from "../controllers/user.js";
import { verifyToken, verifyTokenAdmin } from "../middleware.js";

export const userRouter = express.Router();

userRouter.post("/register", validations.register, controllers.register);
userRouter.get("/verify/:token", controllers.verify);
userRouter.post("/login", validations.login, controllers.login);
userRouter.get("/", verifyTokenAdmin, controllers.getAllUser);

userRouter.use(verifyToken);

userRouter.get("/private", function (req, res) {
  res.status(StatusCodes.OK).json({ message: "GET: private thanh cong" });
});
userRouter.get("/logout", controllers.logout);
userRouter.get("/available", controllers.available);
userRouter.get("/profile", controllers.profile);
userRouter.put(
  "/profile",
  validations.updateProfile,
  controllers.updateProfile
);
