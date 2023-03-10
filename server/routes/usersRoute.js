import express from "express";
import {
  uploadUserPicture,
  signUp,
  login,
  getProfile,
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";
const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
export default router;
