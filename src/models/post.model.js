import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 300,
      default: null,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    published_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);


// Category page: published posts, newest first
postSchema.index({
  category_id: 1,
  status: 1,
  published_at: -1,
});

// Author dashboard: drafts & posts
postSchema.index({
  author_id: 1,
  status: 1,
  createdAt: -1,
});


export const Post = mongoose.model("Post", postSchema);