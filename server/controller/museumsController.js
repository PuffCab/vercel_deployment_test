import museumsModel from "../models/museumsModel.js";

const getAllMuseums = async (req, res) => {
  try {
    const allMuseums = await museumsModel.find({}).populate({
      path: "city",
      select: ["name", "likes"],
    });
    res.status(200).json({
      allMuseums,
      number: allMuseums.length,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "server failed",
    });
  }
};

export { getAllMuseums };
