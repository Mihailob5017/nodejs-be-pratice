import { NextFunction, Request, Response } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../model";
import { EncryptPassword, GenerateSalt } from "../util";
import { ControllerType } from "../types/common";

export const FindVandor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vandor.findOne({ email });
  } else {
    return await Vandor.findById(id);
  }
};

export const GetVandors: ControllerType = async (req, res, next) => {
  const vandors = await Vandor.find();
  if (vandors.length === 0) {
    return res.status(404).json({ message: "No vandors found" });
  }

  return res.json(vandors);
};

export const GetVandorById: ControllerType = async (req, res, next) => {
  const id = req.params.id;
  const vandor = await FindVandor(id);
  if (!vandor) {
    return res.status(404).json({ message: "Vandor not found" });
  }

  return res.json(vandor);
};

export const CreateVandor: ControllerType = async (req, res, next) => {
  const {
    name,
    address,
    email,
    foodType,
    ownerName,
    password,
    phone,
    pinCode,
  } = <CreateVandorInput>req.body;

  const existsingVandor = await FindVandor(undefined, email);
  if (existsingVandor) {
    return res.status(400).json({ message: "Vandor already exists" });
  }

  // Generate salt and hash password
  const salt = await GenerateSalt();
  const encryptedPassword = await EncryptPassword(password, salt);
  // Ecnypt password with salt

  const createVandor = await Vandor.create({
    name,
    address,
    email,
    foodType,
    ownerName,
    password: encryptedPassword,
    phone,
    pinCode,
    salt,
    serviceAvailabilty: false,
    coverImages: [],
    rating: 0,
    foods: [],
  });

  return res.json(createVandor);
};
