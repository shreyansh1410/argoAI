import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      minLength: [10, "Content must be at least 10 characters long"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      maxLength: [500, "Summary cannot be more than 500 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add virtual fields for formatted dates
postSchema.virtual("formattedCreatedAt").get(function () {
  return new Date(this.createdAt).toLocaleDateString();
});

postSchema.virtual("formattedUpdatedAt").get(function () {
  return new Date(this.updatedAt).toLocaleDateString();
});

// Prevent duplicate model compilation error
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
