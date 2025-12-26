import mongoose from "mongoose";

const authorSubmissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true, // to fetch pending submissions fast
    },
    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null until reviewed
      index: true, // quick lookup of submissions reviewed by an admin
    },
    reviewer_note: {
      type: String,
      default: null,
      maxlength: 1000,
       trim: true,
    },
  },
  { timestamps: true }
);

/**
 * Compound index for queries like:
 * "Find pending submissions for a specific reviewer or admin"
 */
authorSubmissionSchema.index({ status: 1, reviewer_id: 1 });

export const AuthorSubmission = mongoose.model(
  "AuthorSubmission",
  authorSubmissionSchema
);