import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  },
});

// Prevent duplicate tag assignments
postTagSchema.index(
  { post_id: 1, tag_id: 1 },
  { unique: true }
);

// Fast lookups
postTagSchema.index({ post_id: 1 });
postTagSchema.index({ tag_id: 1 });

export const PostTag = mongoose.model("PostTag", postTagSchema);
