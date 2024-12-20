"use client";

import Link from "next/link";

export default function BlogCard({ post, onDelete }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      onDelete();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/posts/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <div className="space-x-2">
            <Link
              href={`/posts/${post._id}/edit`}
              className="text-yellow-600 hover:text-yellow-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
