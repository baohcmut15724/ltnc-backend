import Joi from "joi";
import bcrypt from "bcrypt";

import { dataBase } from "../server.js";

function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

async function create(data) {
  data.slug = slugify(data.username);
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().strict(),
    password: Joi.string().required().min(8).max(12).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),

    createdAt: Joi.date().timestamp("javascript").default(Date.now()),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
  });

  try {
    data = await schema.validateAsync(data, { abortEarly: false });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;

    let status = await dataBase.collection("users").insertOne(data);
    data._id = status.insertedId;
    delete data.password;
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function tao(req, res) {
  const arr = ["truck", "coach", "container"];

  try {
    for (let i = 1; i < 11; i++) {
      let data = {};
      data.username = `user${i}`;
      data.password = `1234`;
      data.email = `thaibao${i}`;
      data.fullName = `Bao Thai ${i}`;
      data.phoneNumber = `012345678${i}`;
      data.address = `HCM ${i}`;
      data.drivingLicense = [arr[getRandomNumber(0, 2)]];
      data.admin = false;
      data.status = "inactive";
      data.point = 0;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;

      await dataBase.collection("users").insertOne(data);
    }

    res.json({ message: "Tạo thành công" });
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function taoXe(req, res) {
  const arr = ["truck", "coach", "container"];
  const fuel = ["xăng", "dầu", "điện"];
  try {
    for (let i = 1; i < 11; i++) {
      let data = {};
      data.licensePlate = `51C-${i}`;
      data.type = arr[getRandomNumber(0, 2)];
      data.size = "5*20";
      data.weight = 5000;
      data.fuel = fuel[getRandomNumber(0, 2)];
      data.kmTraveled = 0;
      data.kmMaintenance = 5000;
      data.status = "inactive";
      data.maintenanceHistory = [];

      await dataBase.collection("cars").insertOne(data);
    }

    res.json({ message: "Tạo thành công" });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export const models = {
  create,
  tao,
  taoXe,
};
