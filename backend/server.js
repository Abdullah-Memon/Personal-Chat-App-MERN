// Packages: express, dotenv, cors, cookie-parser
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// =================== DB Connection ===================
import connectDB from "./db/db.connection.js";

// =================== Routes ===================
import authRoutes from "./routes/auth.routes.js";
import msgRoutes from "./routes/msg.routes.js";
import userRoutes from "./routes/user.routes.js";

// Config
dotenv.config();

const API_PORT = process.env.PORT || 5000;
const app = express();

// ===================   Middlewares   ===================
app.use(express.json());

// cors is used to allow the request from different domain name
app.use(cors());

// cookie parse is used to parse (means: share/get) the cookie from the request
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);
app.use("/api/users", userRoutes);

// ===================   Server   ===================
app.listen(API_PORT, () => {
  connectDB();
  console.log(`Server is running at: ${API_PORT}`);
});
