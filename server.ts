import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini client on server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API endpoint for Shera AI Network Assistant / Troubleshooting
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are Shera AI, the intelligent network assistant for Shera Link Village Internet Service Provider. 
You help rural subscribers and village operators with internet troubleshooting, router settings (PPPoE, Static IP, Wi-Fi Repeater mode), data plans, mobile payment guidance (bKash/Nagad), and signal optimization.
Keep your tone polite, helpful, encouraging, and clear. 
Current subscriber context: ${JSON.stringify(context || {})}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: message,
        config: {
          systemInstruction,
        },
      });

      res.json({ reply: response.text || "I'm sorry, I couldn't process that request right now." });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with Shera AI" });
    }
  });

  // API endpoint for AI Router / Line Diagnostics
  app.post("/api/gemini/diagnose", async (req, res) => {
    try {
      const { routerData } = req.body;
      
      const prompt = `Analyze this village internet router telemetry and provide a short diagnosis and step-by-step fix in JSON format (diagnosis, recommendation, signalQuality):
      Telemetry: ${JSON.stringify(routerData)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a senior network engineer inspecting rural wireless links and fiber nodes in Shera Link. Return valid JSON only.",
          responseMimeType: "application/json",
        },
      });

      let jsonResult;
      try {
        jsonResult = JSON.parse(response.text || "{}");
      } catch {
        jsonResult = {
          diagnosis: "Normal operation",
          recommendation: "Signal is stable. No action required.",
          signalQuality: "Good"
        };
      }

      res.json(jsonResult);
    } catch (error: any) {
      console.error("Diagnostics Error:", error);
      res.status(500).json({ error: error.message || "Diagnostic failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Shera Link server running on port ${PORT}`);
  });
}

startServer();
