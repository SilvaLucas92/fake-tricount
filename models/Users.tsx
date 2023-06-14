import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
