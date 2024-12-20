import connectDB from "../../../lib/mongodb";
import Post from "../../../models/Post";
import { generateSummary } from "../../../lib/gemini";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
      }
      break;

    case "POST":
      try {
        const { title, content } = req.body;
        const summary = await generateSummary(content);
        const post = await Post.create({
          title,
          content,
          summary,
        });
        res.status(201).json(post);
      } catch (error) {
        res.status(500).json({ error: "Error creating post" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
