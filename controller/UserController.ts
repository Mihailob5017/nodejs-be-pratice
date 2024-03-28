import { validate } from "class-validator";
import { CreateUserInput } from "../dto/User.dto";
import { ControllerType } from "../types/common";
import { plainToInstance } from "class-transformer";
import { EncryptPassword, GenerateSalt, GenerateSignature } from "../util";
import { User } from "../model/User";
import { GenerateOTP, onRequestOTP } from "../util/NotificationUtility";

export const UserSignUp: ControllerType = async (req, res) => {
  const userInputs = plainToInstance(CreateUserInput, req.body);

  const inputErrors = await validate(userInputs, {
    validationError: { target: true },
  });

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }

  const { email, password, phone } = userInputs;

  const salt = await GenerateSalt();
  const userPassword = await EncryptPassword(password, salt);
  const { otp, expiry } = GenerateOTP();

  const result = await User.create({
    email,
    phone,
    password: userPassword,
    otp,
    salt,
    otp_expiry: expiry,
    firstName: "",
    lastName: "",
    address: "",
    verified: false,
    lat: 0,
    lng: 0,
  });

  if (result) {
    await onRequestOTP(otp, phone);
    const signature = GenerateSignature({
      _id: result.id,
      email: result.email,
      verified: result.verified,
    });

    return res.status(201).json({
      signature: signature,
      verified: result.verified,
      email: result.email,
    });
  }

  return res.status(400).json({ message: "Error with Signup" });
};

export const UserLogin: ControllerType = async (req, res) => {};

export const UserVerify: ControllerType = async (req, res) => {};

export const RequestOTP: ControllerType = async (req, res) => {};

export const GetProfile: ControllerType = async (req, res) => {};

export const EditProfile: ControllerType = async (req, res) => {};
