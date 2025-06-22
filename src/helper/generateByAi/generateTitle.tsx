// lib/gemini.ts
import toast from "react-hot-toast";

export const generateAITitle = async (prompt: string) => {
  if (!prompt.trim()) {
    toast.error("Please enter some context for the title");
    return null;
  }

  try {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a single catchy, SEO-friendly blog post title about: ${prompt}. 
            Return only the title text, no additional explanations or formatting. 
            Keep it under 70 characters.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("Error generating title:", error);
    toast.error("Failed to generate title. Please try again.");
    return null;
  }
};