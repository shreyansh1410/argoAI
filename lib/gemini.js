import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSummary(content) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a prompt that will generate a good summary
    const prompt = `
            Please generate a concise summary of the following blog post content. 
            The summary should be:
            - 2-3 sentences long
            - Capture the main points
            - Be engaging and clear
            - Maximum 500 characters
            
            Blog content:
            ${content}
        `;

    // Generate the summary
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    // Ensure the summary isn't too long
    if (summary.length > 500) {
      return summary.substring(0, 497) + "...";
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
