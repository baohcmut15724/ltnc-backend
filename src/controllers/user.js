import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { models } from "../models/user.js";
import { sendMail } from "../provider.js";
import { htmlVerify, htmlEmail } from "../constant.js";

async function login(req, res) {
  try {
    // res.status(StatusCodes.CREATED).json(await models.login(req.body));
    const user = await models.login(req.body);

    // console.log({ user });
    const token = jwt.sign(
      { _id: user._id, admin: user.admin },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    const newErr = new Error(err);
    // console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
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
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
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
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function logout(req, res) {
  try {
    // await models.logout(req.user);
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ message: "Logout success" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function switchStatus(req, res) {
  try {
    await models.switchStatus(req.user, req.body.available);
    res.status(StatusCodes.OK).json({ message: "Switch status done" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function profile(req, res) {
  try {
    // res.status(StatusCodes.OK).json(req.user);
    res.status(StatusCodes.OK).json(await models.profile(req.user));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function updateProfile(req, res) {
  try {
    res
      .status(StatusCodes.OK)
      .json(await models.updateProfile(req.body, req.user._id));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function getAllUser(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getAllUser());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function history(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.history(req.user));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function cancelTrip(req, res) {
  try {
    await models.cancelTrip(req.user, req.params.id);
    res.status(StatusCodes.OK).json({ message: "Cancel trip success" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function startTrip(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.startTrip(req.params.id));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function finishTrip(req, res) {
  try {
    await models.finishTrip(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Finish trip success" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function getWaitingTrip(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getWaitingTrip(req.user._id));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

export const controllers = {
  login,
  register,
  verify,
  logout,
  switchStatus,
  profile,
  updateProfile,
  getAllUser,
  history,
  cancelTrip,
  startTrip,
  finishTrip,
  getWaitingTrip,
};
