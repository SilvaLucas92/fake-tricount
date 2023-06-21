import mongoose from "mongoose";
const { Schema } = mongoose;

const countsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: true,
  },
});

const Counts = mongoose.models.Counts || mongoose.model("Counts", countsSchema);

export default Counts;
