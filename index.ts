import express from "express";
import { AdminRoute, VandorRoute } from "./route";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import path from "path";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

app.listen(8000, () => {
  console.clear();
  console.log("Server is running on port 8000");
});
