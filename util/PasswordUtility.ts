import bcrypt from "bcrypt";
import { AuthPayload, VandorPayload } from "../dto";
import { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const GenerateSalt = async () => {
  return await bcrypt.genSalt(10);
};

export const EncryptPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  password: string,
  hashedPassword: string,
  salt: string
) => {
  return (await EncryptPassword(password, salt)) === hashedPassword;
};

export const GenerateSignature = (data: AuthPayload) => {
  const signrature = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1d" });

  return signrature;
};

export const VerifySignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = jwt.verify(
      signature.split(" ")[1],
      JWT_SECRET_KEY
    ) as AuthPayload;
    // @ts-ignore
    req.user = payload;

    return true;
  }
};
