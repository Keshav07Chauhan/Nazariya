import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // SEO + URL
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 300,
      default: null,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
