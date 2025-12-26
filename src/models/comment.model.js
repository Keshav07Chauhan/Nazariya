import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
    is_approved: {
      type: Boolean,
      default: false,
      index: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Public comments for a post
commentSchema.index({
  post_id: 1,
  is_approved: 1,
  createdAt: 1,
});

// Thread replies
commentSchema.index({
  parent_id: 1,
  createdAt: 1,
});

export const Comment = mongoose.model("Comment", commentSchema);
