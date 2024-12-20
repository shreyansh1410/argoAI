import { NextResponse } from "next/server";
import connectDB from "@/lib/mogodb";
import Post from "@/models/Post";
import { generateSummary } from "@/lib/gemini";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error in GET /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate AI summary
    const summary = await generateSummary(content);

    const post = await Post.create({
      title,
      content,
      summary,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
