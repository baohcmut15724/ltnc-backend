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
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    // console.log(arrMessage);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
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
    drivingLicense: Joi.array()
      .required()
      .items(Joi.string().valid("truck", "coach", "container"))
      .min(1)
      .max(3),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    // console.log(arrMessage);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

async function updateProfile(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(30).trim().strict(),
    fullName: Joi.string().required().trim().strict(),
    phoneNumber: Joi.string().required().min(10).max(11).trim().strict(),
    address: Joi.string().required().trim().strict(),
    drivingLicense: Joi.array()
      .required()
      .items(Joi.string().valid("truck", "coach", "container"))
      .min(1)
      .max(3),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    // console.log(arrMessage);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

export const validations = {
  login,
  register,
  updateProfile,
};
