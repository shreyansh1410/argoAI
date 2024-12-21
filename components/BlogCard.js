"use client";

import Link from "next/link";
import { Pencil, Trash2, Calendar } from "lucide-react";

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
        <h2 className="text-xl font-bold mb-2">
          <Link
            href={`/posts/${post._id}`}
            className="text-blue-800 hover:text-blue-600 flex items-center"
          >
            {post.title}
          </Link>
        </h2>

        <Link href={`/posts/${post._id}`}>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        </Link>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="space-x-4 flex items-center">
            <Link
              href={`/posts/${post._id}/edit`}
              className="flex items-center text-yellow-600 hover:text-yellow-700"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
