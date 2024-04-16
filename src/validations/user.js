import Joi from "joi";
import { StatusCodes } from "http-status-codes";

async function login(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().strict(),
    password: Joi.string().required().min(8).max(12).trim().strict(),
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
};
