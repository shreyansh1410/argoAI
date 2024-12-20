import { useState } from "react";
import { useRouter } from "next/router";
import BlogForm from "../components/BlogForm";

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // First, generate the AI summary
      const summaryRes = await fetch("/api/posts/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: formData.content }),
      });

      if (!summaryRes.ok) throw new Error("Failed to generate summary");
      const { summary } = await summaryRes.json();

      // Then create the post with the generated summary
      const createRes = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          summary,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create post");

      router.push("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={loading}
        submitLabel="Create Post"
      />
    </div>
  );
}
