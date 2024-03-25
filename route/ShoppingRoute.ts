import express, { Request, Response, NextFunction } from "express";
import { GetFoodAvailablity } from "../controller";
import {
  GetFoodIn30Mins,
  GetTopRestourants,
  SearchFoods,
} from "../controller/ShoppingController";

const router = express();

router.get("/:pincode", GetFoodAvailablity);

router.get("/top-restourants/:pincode", GetTopRestourants);

router.get("/foods-in-30-minutes/:pincode", GetFoodIn30Mins);

router.get("/search/:pincode/", SearchFoods);

router.get("/restourant/:id", GetTopRestourants);

export { router as ShoppingRoute };
