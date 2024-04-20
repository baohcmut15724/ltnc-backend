import { StatusCodes } from "http-status-codes";
import { models } from "../models/user.js";
import jwt from "jsonwebtoken";

import { sendMail } from "../provider.js";
import { htmlVerify, htmlEmail } from "../until.js";

async function login(req, res) {
  try {
    // res.status(StatusCodes.CREATED).json(await models.login(req.body));
    const user = await models.login(req.body);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

async function register(req, res) {
  try {
    const data = await models.register(req.body);

    const token = jwt.sign(data, process.env.JWT_SECRET);
    const subject = "XÁC THỰC TÀI KHOẢN TRUCKING";
    // const htmlContent = `<h1>Click vào link sau để xác thực email</h1>
    // <a href="http://localhost:3000/user/verify/${token}">Xác thực email</a>`;

    const htmlContent = htmlEmail(token);

    sendMail(data.email, subject, htmlContent);

    res.status(StatusCodes.OK).json({ message: "Vui long xac thuc email" });
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

async function verify(req, res) {
  try {
    const user = jwt.verify(req.params.token, process.env.JWT_SECRET);

    delete user.iat;
    await models.verify(user);
    res
      .status(StatusCodes.CREATED)
      // .json({ message: "Registered successfully" });
      // .redirect("http://localhost:3000/login");
      .send(htmlVerify);
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

async function logout(req, res) {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not login");
    }
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ message: "Logout success" });
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
  register,
  verify,
  logout,
};
