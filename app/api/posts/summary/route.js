import { NextResponse } from "next/server";
import { generateSummary } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const summary = await generateSummary(content);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in POST /api/posts/summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
