import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSummary(content) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
            Please generate a concise summary of the following blog post content. 
            The summary should be:
            - 2-3 sentences long
            - Capture the main points
            - Be engaging and clear
            - 700 characters
            
            Blog content:
            ${content}
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    if (summary.length > 700) {
      return summary.substring(0, 697) + "...";
    }

    return summary;
  } catch (error) {
    console.error("Error in generateSummary:", error);
    throw new Error("Failed to generate summary");
  }
}

// Helper function to analyze content sentiment and tone
export async function analyzeContent(content) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
            Analyze the following blog post content and provide:
            1. The overall tone (professional, casual, academic, etc.)
            2. Main keywords (up to 5)
            3. Reading time estimate in minutes
            
            Content:
            ${content}
        `;

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();
    return analysis;
  } catch (error) {
    console.error("Error in analyzeContent:", error);
    throw new Error("Failed to analyze content");
  }
}

// Helper function to suggest improvements
export async function suggestImprovements(content) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
            Review the following blog post content and suggest up to 3 specific improvements for:
            1. Clarity
            2. Engagement
            3. Structure
            
            Content:
            ${content}
        `;

    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();
    return suggestions;
  } catch (error) {
    console.error("Error in suggestImprovements:", error);
    throw new Error("Failed to generate suggestions");
  }
}
