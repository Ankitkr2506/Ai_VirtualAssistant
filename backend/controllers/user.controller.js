import upload from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment/moment.js";

// ─────────────────────────────────────────────────────────────
//  GET /api/user/current
// ─────────────────────────────────────────────────────────────
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(400).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "get current user error" });
  }
};

// ─────────────────────────────────────────────────────────────
//  POST /api/user/update
// ─────────────────────────────────────────────────────────────
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage = imageUrl;

    if (req.file) {
      assistantImage = await upload(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "update Assistant Error" });
  }
};

// ─────────────────────────────────────────────────────────────
//  POST /api/user/asktoassistant
// ─────────────────────────────────────────────────────────────
export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    if (!command)
      return res.status(400).json({ response: "No command provided" });

    // ─── Save user query to history ──────────────────────────
    const user = await User.findById(req.userId);
    user.history.push(command);
    await user.save();

    // ─── Call Gemini ────────────────────────────────────────
    const raw = await geminiResponse(
      command,
      user.assistantName,
      user.name
    );

    if (!raw) {
      return res
        .status(502)
        .json({ response: "Assistant offline, please try again." });
    }

    // ─── Strip ``` fences and parse JSON ────────────────────
    const cleaned = raw.replace(/```[\s\S]*?```/g, "").trim();
    let gemResult;
    try {
      gemResult = JSON.parse(cleaned);
    } catch (e) {
      console.warn("⚠️  Bad JSON from Gemini:", cleaned);
      return res
        .status(502)
        .json({ response: "Sorry, I couldn't understand that." });
    }

    const { type, userInput, response: reply } = gemResult;

    // ─── Command Routing ────────────────────────────────────
    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get-time":
        return res.json({
          type,
          userInput,
          response: `current time is ${moment().format("hh:mm A")}`,
        });

      case "get-day":
        return res.json({
          type,
          userInput,
          response: `today is ${moment().format("dddd")}`,
        });

      case "get-month":
        return res.json({
          type,
          userInput,
          response: `current month is ${moment().format("MMMM")}`,
        });

      // Pass‑through commands
      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "general":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
        return res.json({ type, userInput, response: reply });

      default:
        return res.status(400).json({
          response: "I didn't understand that command.",
        });
    }
  } catch (err) {
    console.error("askToAssistant error:", err);
    res.status(500).json({ message: "ask Assistant error" });
  }
};
