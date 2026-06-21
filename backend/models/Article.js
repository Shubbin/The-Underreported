import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String, required: true, index: true },
    state: { type: String, index: true },
    authorSlug: { type: String, required: true },
    publishedAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date },
    readingMinutes: { type: Number },
    excerpt: { type: String },
    body: { type: [String], required: true },
    tags: { type: [String], index: true },
    factChecked: { type: Boolean, default: false },
    isInvestigation: { type: Boolean, default: false },
    sources: [{ label: String }],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
