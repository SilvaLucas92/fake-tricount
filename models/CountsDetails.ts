import mongoose from "mongoose";
const { Schema } = mongoose;

const countsDetailsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
  },
  paid_by: {
    type: String,
    required: true,
  },
  countID: {
    type: String,
    required: true,
    unique: true,
  },
});

const CountsDetails =
  mongoose.models.CountsDetails ||
  mongoose.model("CountsDetails", countsDetailsSchema);

export default CountsDetails;
