"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import Loading from "@/components/Loading";

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push(`/posts/${params.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!post) return <div className="text-center p-4">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-black">Edit Post</h1>
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={post}
        submitLabel="Update Post"
      />
    </div>
  );
}
