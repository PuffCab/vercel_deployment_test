import mongoose from "mongoose";
const { Schema } = mongoose;
const museumsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  city: { type: Schema.Types.ObjectId, ref: "city" },
});

const museumsModel = mongoose.model("museum", museumsSchema);
export default museumsModel;
