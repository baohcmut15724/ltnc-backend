import { ObjectId } from "mongodb";

import { dataBase } from "../server.js";

async function create(data) {
  try {
    const xe = await dataBase
      .collection("cars")
      .findOne({ licensePlate: data.licensePlate });
    if (xe) {
      throw new Error("Car already exists");
    }

    data.kmTraveled = 0;
    data.kmMaintenance = 5000;
    data.status = "inactive";
    data.maintenanceHistory = [];
    const car = await dataBase.collection("cars").insertOne(data);
    data._id = car.insertedId;
    return data;
  } catch (err) {
    throw err;
  }
}

async function update(data, id) {
  try {
    const car = await dataBase.collection("cars").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      {
        returnDocument: "after",
      }
    );
    return car;
  } catch (err) {
    throw err;
  }
}

async function getCars() {
  try {
    const cars = await dataBase.collection("cars").find().toArray();
    return cars;
  } catch (err) {
    throw err;
  }
}

async function deleteCar(id) {
  try {
    await dataBase
      .collection("cars")
      .findOneAndDelete({ _id: new ObjectId(id) });
  } catch (err) {
    throw err;
  }
}

async function makeMaintenance(data, id) {
  try {
    const car = await dataBase.collection("cars").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      {
        returnDocument: "after",
      }
    );
    return car;
  } catch (err) {
    throw err;
  }
}

async function maintenance(id) {
  try {
    const cars = await dataBase
      .collection("cars")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status: "maintenance" } },
        { returnDocument: "after" }
      );
    // return cars;
  } catch (err) {
    throw err;
  }
}

async function maintenanceDone(data, id) {
  try {
    data.time = Date.now();
    // console.log(data);
    const car = await dataBase.collection("cars").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          maintenanceHistory: data,
        },

        $set: {
          status: "inactive",
          kmTraveled: 0,
          // kmMaintenance: 5000,
        },
      },
      {
        returnDocument: "after",
      }
    );
    // return car;
  } catch (err) {
    throw err;
  }
}

export const models = {
  create,
  update,
  getCars,
  deleteCar,
  makeMaintenance,
  maintenance,
  maintenanceDone,
};
