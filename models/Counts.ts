import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const countsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  created_by: { type: String, required: true },
  participant: { type: String, required: true },
});

const Counts = models.Counts || mongoose.model("Counts", countsSchema);

export default Counts;
