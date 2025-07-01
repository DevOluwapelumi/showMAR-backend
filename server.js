const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// ✅ CORS First
app.use(
  cors({
    origin: ["http://localhost:5173", "https://showmar.vercel.app"],
    credentials: true,
  })
);

// ✅ Parse JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files for avatars/uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));

// ✅ Connect DB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
