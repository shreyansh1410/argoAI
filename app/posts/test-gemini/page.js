import { generateSummary } from "@/lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Test content
    const testContent = `
            React is a JavaScript library for building user interfaces. 
            It was developed by Facebook and is now maintained by both Facebook and a community of individual developers.
            React allows developers to create large web applications that can change data without reloading the page.
        `;

    const summary = await generateSummary(testContent);

    // Verify summary is generated and within constraints
    if (!summary) {
      throw new Error("No summary generated");
    }

    if (summary.length > 500) {
      throw new Error("Summary exceeds maximum length");
    }

    res.status(200).json({
      success: true,
      summary,
      length: summary.length,
    });
  } catch (error) {
    console.error("Gemini test failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: "Gemini integration test failed",
    });
  }
}
