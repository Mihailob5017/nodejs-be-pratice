import { NextFunction, Request, Response } from "express";
import { EditVandorInputs, VandorLoginInput } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../util";
import { CreateFoodInput } from "../dto/Food.dto";
import { Food } from "../model/Food";
import { ControllerType } from "../types/common";

export const VandorLogin: ControllerType = async (req, res, next) => {
  const { email, password } = <VandorLoginInput>req.body;

  const existsingVandor = await FindVandor(undefined, email);

  if (existsingVandor) {
    const validation = await ValidatePassword(
      password,
      existsingVandor.password,
      existsingVandor.salt
    );

    if (validation) {
      const signature = GenerateSignature({
        _id: existsingVandor._id,
        email: existsingVandor.email,
        name: existsingVandor.name,
        foodType: existsingVandor.foodType,
      });
      return res.json({ message: "Login successful", signature });
    } else {
      return res.json({ message: "Invalid credentials" });
    }
  }

  return res.json({ message: "Invalid credentials" });
};

export const getVandorProfile: ControllerType = async (req, res, next) => {
  const user = req.user;

  if (user) {
    res.send(user);
  } else {
    res.json({ message: "Unauthorized" });
  }
};

export const updateVandorProfile: ControllerType = async (req, res, next) => {
  const { name, address, foodType, phone } = <EditVandorInputs>req.body;

  const user = req.user;

  if (user) {
    const existingVandor = await FindVandor(user._id);
    if (existingVandor !== null) {
      existingVandor.name = name;
      existingVandor.foodType = foodType;
      existingVandor.address = address;
      existingVandor.phone = phone;

      const updatedVandor = await existingVandor.save();
      res.json({ message: "Profile updated", updatedVandor });
    } else {
      res.json({ message: "User not found" });
    }
  } else {
    res.json({ message: "Unauthorized" });
  }
};

export const updateVandorService: ControllerType = async (req, res, next) => {
  const user = req.user;

  if (user) {
    const existingVandor = await FindVandor(user._id);
    if (existingVandor !== null) {
      existingVandor.serviceAvailabilty = !existingVandor.serviceAvailabilty;
      const updatedVandor = await existingVandor.save();
      res.json({ message: "Service Availability updated", updatedVandor });
    } else {
      res.json({ message: "User not found" });
    }
  } else {
    res.json({ message: "Unauthorized" });
  }
};

export const AddFood: ControllerType = async (req, res, next) => {
  const user = req.user;

  if (user) {
    const foodObj = <CreateFoodInput>req.body;
    const files = req.files as [Express.Multer.File];
    const vandorObj = await FindVandor(user._id);

    const images = files.map((file: Express.Multer.File) => file.filename);

    if (vandorObj !== null) {
      const createdFood = await Food.create({
        vandorId: vandorObj.id,
        images,
        rating: 0,
        ...foodObj,
      });

      vandorObj.foods.push(createdFood.id);

      const result = await vandorObj.save();
      return res.json(result);
    }
  }

  return res.json({ message: "Something went wrong" });
};

export const GetFoods: ControllerType = async (req, res, next) => {
  const user = req.user;

  if (user) {
    const foods = await Food.find({ vandorId: user._id });
    if (foods) {
      return res.json(foods);
    }
  }

  return res.json({ message: "Something went wrong" });
};

export const updateCoverPicture: ControllerType = async (req, res, next) => {
  const user = req.user;

  if (user) {
    const vandorObj = await FindVandor(user._id);
    if (vandorObj !== null) {
      const files = req.files as [Express.Multer.File];
      const images = files.map((file: Express.Multer.File) => file.filename);
      vandorObj.coverImages.push(...images);
      const result = await vandorObj.save();
      return res.json(result);
    }
  }

  return res.json({ message: "Something went wrong" });
};
