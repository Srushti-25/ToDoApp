const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.route");
const taskRoutes = require("./src/routes/task.route");
const connectDB = require("./src/config/db");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://to-do-app-lgzc-git-main-srushti-25s-projects.vercel.app",
      "https://to-do-app-lgzc-r1ro4panp-srushti-25s-projects.vercel.app"
    ],
    credentials: true,
  })
);

// Database Connection
connectDB();

// Home Route
app.get("/", (req, res) => {
    res.send("Backend server is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});