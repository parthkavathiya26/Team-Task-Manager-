const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes (पहले ये रहेंगे)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/dashboard", require("./routes/dashboard"));

// ✅ Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// 🔥 FRONTEND SERVE (SAFE WAY)
const buildPath = path.join(__dirname, "build");

// Static files serve
app.use(express.static(buildPath));

// ⚠️ ONLY non-API routes fallback
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ❌ Error handler (debug helpful)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).send("Server Error");
});

// MongoDB + Server start
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1); // important for Railway
  });