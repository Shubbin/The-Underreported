import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    role: { type: String },
    bio: { type: String },
    initials: { type: String },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
export default Author;
