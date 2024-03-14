import { NextFunction, Request, Response } from "express";
import { EditVandorInputs, VandorLoginInput } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../util";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    res.send(user);
  } else {
    res.json({ message: "Unauthorized" });
  }
};

export const updateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

export const updateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

export const AddFood = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
  }

  return res.json({ message: "Something went wrong" });
};

export const GetFoods = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user) {
  }

  return res.json({ message: "Something went wrong" });
};
