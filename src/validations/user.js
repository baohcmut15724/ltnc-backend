import Joi from "joi";
import { StatusCodes } from "http-status-codes";

async function login(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(30).trim().strict(),
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

async function register(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(30).trim().strict(),
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "vn"] },
      })
      .trim()
      .strict(),
    fullName: Joi.string().required().trim().strict(),
    phoneNumber: Joi.string().required().min(10).max(11).trim().strict(),
    address: Joi.string().required().trim().strict(),
    drivingLicense: Joi.string()
      .required()
      .valid("truck", "coach", "container"),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

export const validations = {
  login,
  register,
};
