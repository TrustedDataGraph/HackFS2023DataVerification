import mongoose from "mongoose";

const dataSetSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Please provide slug"],
    },
    eligible_data_size: {
      type: Number,
      required: [true, "Please file data size"],
    },
    elegible_deal_count: {
      type: Number,
      required: [true, "Please deal count"],
    },
    miner_list: {
      type: [String],
      required: [true, "Please miner list"],
    },
    locations_stored: {
      type: [String],
      required: [true, "Please enter location stored"],
    },
    rank: {
      type: Number,
      required: [true, "Please enter rank"],
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Users",
    //   required: [true, "Please provide user"],
    // },
  },
  { timestamps: true }
);
export default mongoose.model("DataSet", dataSetSchema);
