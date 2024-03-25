import express, { Request, Response } from "express";
import {
  AddFood,
  GetFoods,
  VandorLogin,
  getVandorProfile,
  updateCoverPicture,
  updateVandorProfile,
  updateVandorService,
} from "../controller";
import { Authenticate } from "../middleware";
import multer from "multer";

const router = express();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from Vandor" });
});

router.post("/login", VandorLogin);
router.use(Authenticate);
router.get("/profile", getVandorProfile);
router.patch("/profile", updateVandorProfile);
router.patch("/service", updateVandorService);
router.patch("/coverimage", images, updateCoverPicture);
router.post("/food", images, AddFood);

router.get("/foods", GetFoods);

export { router as VandorRoute };
