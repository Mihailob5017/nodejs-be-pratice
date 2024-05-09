import { Vandor } from "../model";
import { FoodDoc } from "../model/Food";
import { ControllerType } from "../types/common";

export const GetFoodAvailablity: ControllerType = async (req, res, next) => {
  const pincode = req.params.pincode;

  const result = await Vandor.find({
    pinCode: pincode,
    serviceAvailabilty: true,
  })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    return res.status(200).json({
      ...result,
    });
  }
  return res.status(400).json({ message: "No Data" });
};

export const GetTopRestourants: ControllerType = async (req, res, next) => {
  const pincode = req.params.pincode;
  const result = await Vandor.find({
    pinCode: pincode,
  })
    .sort([["rating", "descending"]])
    .limit(1);

  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ message: "Data not found" });
};

export const GetFoodIn30Mins: ControllerType = async (req, res, next) => {
  const pincode = req.params.pincode;

  const result = await Vandor.find({
    pinCode: pincode,
    serviceAvailabilty: true,
  }).populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];

    result.map((vandor) => {
      const foods = vandor.foods as unknown as [FoodDoc];
      foodResult.push(...foods.filter((food) => food.readyTime <= 30));
    });

    return res.status(200).json(foodResult);
  }

  return res.status(400).json({ message: "Data not found" });
};

export const SearchFoods: ControllerType = async (req, res, next) => {
  const pincode = req.params.pincode;

  const result = await Vandor.find({
    pinCode: pincode,
  }).populate("foods");

  if (result.length > 0) {
    let foodRes: any = [];

    result.map((item) => foodRes.push(...item.foods));
    return res.status(200).json(foodRes);
  }

  return res.status(400).json({ message: "Data not found" });
};

export const GetRestourantById: ControllerType = async (req, res, next) => {
  const id = req.params.id;
  const result = await Vandor.findById(id);

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "Data not found" });
};
