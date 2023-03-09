import userModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "narwhals-spike",
    });
    console.log("uploadResult", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    res.status(200).json({
      message: "Image upload succesfull",
      imageUrl: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

const signUp = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          msg: "User Registered successfully",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving new user", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "registration not possible", error: error });
  }
};

const login = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (!existingUser) {
      res.status(401).json({ msg: "user not found" });
    } else {
      const verified = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!verified) {
        res.status(401).json({ msg: "wrong password" });
      }
      if (verified) {
        console.log("user is logged in");
        const token = issueToken(existingUser.id);
        console.log("token :>> ", token);
        res.status(201).json({
          msg: "user is logged in",
          user: {
            userName: existingUser.userName,
            email: existingUser.email,
            id: existingUser._id,
            avatarPicture: existingUser.avatarPicture,
          },
          token,
        });
      }
    }
  } catch (error) {}
};

const getProfile = async (req, res) => {
  console.log("req.user >>>>", req.user);

  res.status(201).json({
    email: req.user.email,
    userName: req.user.userName,
    avatarPicture: req.user.avatarPicture,
  });
};

export { uploadUserPicture, signUp, login, getProfile };
