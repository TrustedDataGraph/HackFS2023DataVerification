import mongoose from "mongoose";

const dataSetSchema = new mongoose.Schema(
  {
    dataCid: {
      type: String,
      required: [true, "Please provide CID"],
    },
    file_name: {
      type: String,
      required: [true, "Please file name"],
    },
    storage_providers: {
      type: [String],
      required: [true, "Please storage providers"],
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
