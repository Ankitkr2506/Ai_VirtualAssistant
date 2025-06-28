import axios from "axios";
import dotenv from "dotenv";
dotenv.config();                           // ← make sure env vars load on Vercel

const GEMINI_API_URL = process.env.GEMINI_API_URL;

/**
 * Calls the Gemini model and returns the raw text response.
 * Returns `null` if anything goes wrong so the controller can handle it.
 */
const geminiResponse = async (command, assistantName, userName) => {
  try {
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.
Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
          "get-time" | "get-date" | "get-day" | "get-month" |
          "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input>" {only remove your name from userinput if exists} 
                aur agar kisi ne google ya youtube pe kuch search karne ko bola hai 
                to userInput me only vo search wala text jaye,
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, doing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question.
aur agar koi aisa question puchta hai jiska answer tumhe pta hai usko bhi
general ki category me rakho bas short answer dena
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user wants to know weather.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tumhe kisne banaya.
- Only respond with the JSON object, nothing else.

now your userInput- ${command}
`;

    const { data } = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Safely dig into the response
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    return text;
  } catch (err) {
    // Log full error from Google if available
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    return null;
  }
};

export default geminiResponse;
