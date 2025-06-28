import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";


const app = express();



// Replace with your actual frontend URL
const allowedOrigins = [
  "https://ai-virtual-assistant-rz7i.vercel.app",
  //"http://localhost:5173"
  // Add more origins here if needed
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Allow specific origins (for production security)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all origins (during dev/testing – remove in production)
    return callback(null, true);
  },
  credentials: true
}));





app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.get("/", async (req, res) => {
  
 res.status(200).json({ message: 'Hello from the backend!' });
})



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
