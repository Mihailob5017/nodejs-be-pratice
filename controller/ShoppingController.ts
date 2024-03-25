import { Vandor } from "../model";
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

export const GetTopRestourants: ControllerType = async (req, res, next) => {};

export const GetFoodIn30Mins: ControllerType = async (req, res, next) => {};

export const SearchFoods: ControllerType = async (req, res, next) => {};

export const GetRestourantById: ControllerType = async (req, res, next) => {};
