import Joi from "joi";
import bcrypt from "bcrypt";

import { dataBase } from "../server.js";

async function login(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ username: data.username });
    // console.log(user);
    if (!user) throw new Error("User not found!");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Password is incorrect!");

    delete user.password;
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

async function register(data) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "edu", "vn"] },
    }),
    createdAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
  });

  try {
    data = await schema.validateAsync(data, { abortEarly: false });

    const user = await dataBase
      .collection("users")
      .findOne({ $or: [{ username: data.username }, { email: data.email }] });
    if (user) {
      throw new Error("Username or email available");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

async function verify(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ $or: [{ username: data.username }, { email: data.email }] });

    if (!user) {
      await dataBase.collection("users").insertOne(data);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export const models = {
  login,
  register,
  verify,
};
