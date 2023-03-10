import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/testRoutes.js";
import citiesRoute from "./routes/citiesRoute.js";
import museumsRoute from "./routes/museumsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";

const app = express();
const port = process.env.PORT || 5005;

const addMiddleware = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const allowedOrigins = [
    "https://vercel-front-app.vercel.app/",
    "http://localhost:3000",
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log(
          "allowedOrigins.indexOf(origin)",
          allowedOrigins.indexOf(origin)
        );
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(cors(corsOptions));
  // app.use(cors());
  cloudinaryConfig();

  app.use(passport.initialize());
  passportConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on ${port} port `);
  });
};

const mongoBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`MongoDB is connected on port ${port} `);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

const loadRoutes = () => {
  app.use("/api/users", router);
  app.use("/api/cities", citiesRoute);
  app.use("/api/museums", museumsRoute);
  app.use("/api/users", usersRoute);
};

(async function controller() {
  await mongoBConnection();
  addMiddleware();
  loadRoutes();
  startServer();
})();
