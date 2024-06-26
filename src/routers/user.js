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
userRouter.post(
  "/switchStatus/",
  validations.switchStatus,
  controllers.switchStatus
);
userRouter.get("/profile", controllers.profile);
userRouter.put(
  "/profile",
  validations.updateProfile,
  controllers.updateProfile
);
userRouter.get("/history", controllers.history);

userRouter.get("/cancelTrip/:id", controllers.cancelTrip);
userRouter.get("/startTrip/:id", controllers.startTrip);
userRouter.get("/finishTrip/:id", controllers.finishTrip);
userRouter.get("/getWaitingTrip", controllers.getWaitingTrip);
