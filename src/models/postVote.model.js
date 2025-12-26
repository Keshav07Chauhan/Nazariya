import mongoose from "mongoose";

const postVoteSchema = new mongoose.Schema(
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
    vote_type: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate votes
postVoteSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

// Fast lookups
postVoteSchema.index({ user_id: 1 });
postVoteSchema.index({ post_id: 1 });

export const PostVote = mongoose.model("PostVote", postVoteSchema);
