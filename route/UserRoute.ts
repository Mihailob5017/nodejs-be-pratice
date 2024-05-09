import express from "express";
import {
  EditProfile,
  GetProfile,
  RequestOTP,
  UserLogin,
  UserSignUp,
  UserVerify,
} from "../controller";

const router = express();

router.post("/signup", UserSignUp);

router.post("/login", UserLogin);

// Require AUTH
router.patch("/verify", UserVerify);

router.get("/otp", RequestOTP);

router.get("/profile", GetProfile);

router.patch("/profile", EditProfile);

export { router as UserRoute };
