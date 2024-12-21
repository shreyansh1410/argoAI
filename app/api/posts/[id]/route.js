import { NextResponse } from "next/server";
import connectDB from "@/lib/mogodb";
import Post from "@/models/Post";
import { generateSummary } from "@/lib/gemini";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error in GET /api/posts/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate new summary if content changed
    const currentPost = await Post.findById(params.id);
    let summary = currentPost.summary;

    if (content !== currentPost.content) {
      summary = await generateSummary(content);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      params.id,
      {
        title,
        content,
        summary,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error in PUT /api/posts/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedPost = await Post.findByIdAndDelete(params.id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/posts/[id]:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
