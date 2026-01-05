import { ApiError } from "handle-backbone";
import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { AuthorSubmission } from "../models/authorSubmission.model.js";



/**
 * Factory middleware to check ownership of a resource.
 *
 * @param {Object} options
 * @param {import('mongoose').Model} options.model - Mongoose model of the resource.
 * @param {string} [options.ownerField='user_id'] - Field in the model that stores owner ID.
 * @param {string} [options.param='id'] - Name of the route parameter containing resource ID.
 * @param {boolean} [options.allowAdmin=true] - If true, admin can bypass ownership check.
 * @param {string|null} [options.attach=null] - If set, attaches the resource to req[attach].
 *
 * @returns {Function} Express middleware
 *
 * @throws {ApiError} 400 if resourceId is invalid
 * @throws {ApiError} 404 if resource not found
 * @throws {ApiError} 403 if user does not own the resource
 *
 * @example
 * router.put("/posts/:postId", verifyJWT, isPostOwner, updatePost);
 */
export const checkOwnership = ({
  model,
  ownerField = "user_id",
  param = "id",
  allowAdmin = true,
  attach = null,
}) => {
  return async (req, res, next) => {
    const resourceId = req.params[param];

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      throw new ApiError(400, "Invalid resource id");
    }

    const resource = await model.findById(resourceId);

    if (!resource) {
      throw new ApiError(404, "Resource not found");
    }

    // Admin bypass
    if (allowAdmin && req.user.role === "admin") {
      if (attach) req[attach] = resource;
      return next();
    }

    const ownerId = resource[ownerField]?.toString();

    if (!ownerId || ownerId !== req.user._id.toString()) {
      throw new ApiError(403, "You do not own this resource");
    }

    if (attach) req[attach] = resource;
    next();
  };
};




/**
 * Middleware to check if the authenticated user owns a post.
 * Attaches the post document to req.post if attach is set.
 */
export const isPostOwner = checkOwnership({
  model: Post,
  ownerField: "author_id",
  param: "postId",
  attach: "post",
});

/**
 * Middleware to check if the authenticated user owns a comment.
 * Attaches the comment document to req.comment if attach is set.
 */
export const isCommentOwner = checkOwnership({
  model: Comment,
  ownerField: "user_id",
  param: "commentId",
  attach: "comment",
});

/**
 * Middleware to check if the authenticated user owns an author submission.
 * Attaches the submission document to req.submission if attach is set.
 */
export const isSubmissionOwner = checkOwnership({
  model: AuthorSubmission,
  ownerField: "user_id",
  param: "submissionId",
  attach: "submission",
});
