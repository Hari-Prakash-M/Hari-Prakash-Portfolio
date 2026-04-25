import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { rawResumeText } from "./src/resumeText";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  // Using the new @google/genai syntax
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message } = req.body;
      
      const systemInstruction = `You are the AI assistant for Hari Prakash M, an AI & Data Science Engineering student. Your goal is to help recruiters and visitors learn about Hari's skills, projects, and experiences based ONLY on his resume data. Be professional, engaging, and concise.

Resume Data:
${rawResumeText}
`;

      const chat = ai.chats.create({
        model: "gemini-3.1-flash-preview",
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      // We manually add history if we want, or we can just send the message
      // Note: With the new SDK we can pass history in initialization or just send content iteratively.
      // For simplicity, we can pass the whole history as text, or format as needed.
      // But let's construct a continuous prompt or use generateContent if we want stateless.
      
      // Stateless approach with manual history prep (easier with base generateContent)
      let contents = [];
      if (history && history.length > 0) {
        history.forEach((msg: any) => {
          if (msg.role === 'model') return; // Skip or map properly. Let's send a combined prompt for stateless
        });
      }
      
      let contextStr = history.map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n');
      contextStr += `\nUser: ${message}\nAssistant:`;

      const response = await ai.models.generateContent({
         model: "gemini-3-flash-preview",
         contents: contextStr,
         config: {
           systemInstruction,
           temperature: 0.7,
         }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
