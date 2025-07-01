const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const {
  getProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../controllers/userController");

// Storage for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${req.user.id}.${ext}`);
  },
});
const upload = multer({ storage });

// /api/users/me
router.get("/me", auth, getProfile);

// /api/users/watchlist
router.get("/watchlist", auth, getWatchlist);
router.post("/watchlist", auth, addToWatchlist);
router.delete("/watchlist/:movieId", auth, removeFromWatchlist);

/// ✅ Profile Update Route
router.put(
  "/profile",
  auth,
  upload.single("avatar"), // must come BEFORE accessing req.body
  async (req, res) => {
    try {
      // ✅ Only destructure after multer parses it
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (req.file) user.avatarUrl = `/uploads/${req.file.filename}`;

      await user.save();
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
