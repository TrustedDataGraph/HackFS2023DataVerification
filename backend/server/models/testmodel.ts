import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide text"],
  },
});

export default mongoose.model("Users", testSchema);
