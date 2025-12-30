import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import pool from "./config/db.js";
import createUserTable from "./data/createUserTable.js";
// import router from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", userRoutes);

// Error handling middleware (must be last)
app.use(errorHandling);

//Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

//Create table if not exists
createUserTable();

//Testing
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  console.log(result.rows);
  res.send("Welcome to the Node.js with PostgreSQL API");
});
