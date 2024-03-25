import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    mongoose
      .connect(MONGO_URI, {
        dbName: "foodapp",
      })
      .then((data) => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Error in connecting to database");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
