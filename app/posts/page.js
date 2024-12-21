"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts yet. Create your first post!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} onDelete={fetchPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
