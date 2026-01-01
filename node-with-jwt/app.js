// app.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
const PORT = process.env.PORT || 3995;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'JWT Auth API is running. Use /auth for authentication, protected routes for data.' });
});
app.use("/auth", authRoutes);
app.use("/", protectedRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
