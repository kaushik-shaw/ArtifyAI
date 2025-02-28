import express from "express";
import { generateImage } from "../controllers/ImageController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate", upload.fields([
    { name: "sourceImage", maxCount: 1 },
    { name: "targetImage", maxCount: 1 }
]), authUser, generateImage);

export default imageRouter;