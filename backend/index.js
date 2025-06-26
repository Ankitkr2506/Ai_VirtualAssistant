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

const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-virtual-assistant-blond.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies
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
