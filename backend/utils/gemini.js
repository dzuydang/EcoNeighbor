import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function generateRecommendation(title, description) {
  const prompt = `
  You are a neighborhood environmental/safety expert.
  Provide ONE actionable recommendation.
  Title: ${title}
  Description: ${description}

  Respond with ONLY the recommended action.
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    },
  );

  const data = await response.json();

  if (data.error) {
    console.error(data.error);
    throw new Error("Gemini API error");
  }

  return data.candidates[0].content.parts[0].text;
}
