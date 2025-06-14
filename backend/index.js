import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";


const app = express();

app.use(cors({
  origin: "http://localhost:5173", // ✅ Set your frontend origin here
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

// Connect DB and start server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });
