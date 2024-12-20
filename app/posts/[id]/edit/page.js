import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BlogForm from "../../../components/BlogForm";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError("Failed to load post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Generate new summary if content has changed
      let summary = post.summary;
      if (formData.content !== post.content) {
        const summaryRes = await fetch("/api/posts/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: formData.content }),
        });

        if (!summaryRes.ok) throw new Error("Failed to generate summary");
        const summaryData = await summaryRes.json();
        summary = summaryData.summary;
      }

      // Update the post
      const updateRes = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          summary,
        }),
      });

      if (!updateRes.ok) throw new Error("Failed to update post");

      router.push(`/posts/${id}`);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!post) return <div className="text-center p-8">Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={loading}
        initialData={post}
        submitLabel="Update Post"
      />
    </div>
  );
}
