const express = require("express");
const {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const verifyToken = require("../middleware/authMiddleware.js"); // Use require instead of parentheses

const router = express.Router();

// POST /api/reviews
router.post("/", verifyToken, createReview);

// GET /api/reviews/:movieId
router.get("/:movieId", getReviewsByMovie);

// PUT /api/reviews/:id
router.put("/:id", verifyToken, updateReview);

// DELETE /api/reviews/:id
router.delete("/:id", verifyToken, deleteReview);

module.exports = router; // Use module.exports
