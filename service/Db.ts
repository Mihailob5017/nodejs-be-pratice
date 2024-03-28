import mongoose from "mongoose";

export default async () => {
  const MONGO_URI = process.env.MONGO_URI as string;
  console.log(MONGO_URI);
  console.log("MONGo");
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
