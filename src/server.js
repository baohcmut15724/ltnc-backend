import express from "express";
import exitHook from "async-exit-hook";
import { MongoClient } from "mongodb";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./routers/index.js";
import { corsOptions } from "./config.js";

export let dataBase = null;

function runSerer() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  app.use(router);

  app.listen(process.env.PORT, () => {
    console.log(
      `Hi ${process.env.AUTHOR}, server is running http://localhost:${process.env.PORT}`
    );
  });

  exitHook(async function () {
    console.log("Database is closing...");
    await dataBase.client.close();
  });
}

async function connectDB() {
  const client = new MongoClient(process.env.DB_URL);
  await client.connect();
  dataBase = client.db(process.env.DB_NAME);
  //   FIXME: Tim cach nhan biet khi ten dataBase sai va nem ra loi nhu duoi
  //   if (!dataBase) throw new Error("Database not found!");
}

(async function () {
  try {
    await connectDB();
    runSerer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
