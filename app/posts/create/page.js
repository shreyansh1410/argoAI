"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/BlogForm";

export default function CreatePost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/posts");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-black">Create New Post</h1>
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Post"
      />
    </div>
  );
}
