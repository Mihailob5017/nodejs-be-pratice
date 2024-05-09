import { IsEmail, Length } from "class-validator";

export class CreateUserInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;
}

export interface UserPayload {
  _id: string;
  email: string;
  verified: boolean;
}
