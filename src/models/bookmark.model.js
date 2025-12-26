import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate bookmarks
bookmarkSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

// Fast lookups
bookmarkSchema.index({ user_id: 1 });
bookmarkSchema.index({ post_id: 1 });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
