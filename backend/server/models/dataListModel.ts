import mongoose from "mongoose";

const dataListSchema = new mongoose.Schema(
  {
    project_id: {
      type: String,
      required: [true, "Please provide project id"],
    },
    deal_id: {
      type: String,
      required: [true, "Please provide file deal id"],
    },
    deal_start_epoch: {
      type: Number,
      required: [true, "Please provide deal start epoch"],
    },
    payload_cid: {
      type: String,
      required: [true, "Please provide cid"],
    },
    data_size: {
      type: Number,
      required: [true, "Please enter data size"],
    },
    filename: {
      type: String,
      required: [true, "Please provide file name"],
    },
    file_format: {
      type: String,
      required: [true, "Please provide file format"],
    },
    curated_dataset: {
      type: String,
      required: [true, "Please provide curated dataset"],
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    phase: {
      type: String,
      required: [true, "Please provide phase"],
    },

    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Users",
    //   required: [true, "Please provide user"],
    // },
  },
  { timestamps: true }
);
export default mongoose.model("DataList", dataListSchema);
