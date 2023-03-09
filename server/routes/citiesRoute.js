import express from "express";
import {
  getAllCities,
  getCitiesByCountryCode,
} from "../controller/citiesController.js";
const router = express.Router();

router.get("/all", getAllCities);

router.get("/:countryCode", getCitiesByCountryCode);

export default router;
