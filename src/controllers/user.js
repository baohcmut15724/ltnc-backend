import { StatusCodes } from "http-status-codes";
import { models } from "../models/user.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
  try {
    // res.status(StatusCodes.CREATED).json(await models.login(req.body));
    const user = await models.login(req.body);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(StatusCodes.OK).json({ message: "Login success!" });
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

export const controllers = {
  login,
};
