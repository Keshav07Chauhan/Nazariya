import { ApiError } from "handle-backbone";

/**
 * Middleware factory to restrict access based on user roles.
 *
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 * @returns {Function} Express middleware
 *
 * @example
 * router.post("/admin/posts", verifyJWT, requireRoles("admin"), createPost);
 */
export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      // Should never happen if verifyJWT is applied
      throw new ApiError(401, "Authentication required");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action");
    }

    next();
  };
};

/**
 * Shortcut middleware for admin-only routes
 */
export const requireAdmin = requireRoles("admin");

/**
 * Shortcut middleware for author-only routes
 */
export const requireAuthor = requireRoles("author");

/**
 * Shortcut middleware for reader-only routes
 */
export const requireReader = requireRoles("reader");
