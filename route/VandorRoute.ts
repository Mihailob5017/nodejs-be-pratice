import express, { Request, Response } from "express";
import {
  VandorLogin,
  getVandorProfile,
  updateVandorProfile,
  updateVandorService,
} from "../controller";
import { Authenticate } from "../middleware";

const router = express();

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from Vandor" });
});

router.post("/login", VandorLogin);
router.use(Authenticate);
router.get("/profile", getVandorProfile);
router.patch("/profile", updateVandorProfile);
router.patch("/service", updateVandorService);
router.post("/food");
router.get("/foods");

export { router as VandorRoute };
