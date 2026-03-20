const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function invokeGeminiAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello! Explain what is interview in few words",
  });
  console.log(response.text);
}

module.exports = invokeGeminiAi;
