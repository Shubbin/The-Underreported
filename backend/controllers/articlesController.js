import Article from "../models/Article.js";
import Author from "../models/Author.js";

// @desc    Get all articles
// @route   GET /api/articles
export const getArticles = async (req, res) => {
  try {
    const { category, state, authorSlug, tag, q, limit, from, to } = req.query;
    let query = {};

    if (category) query.category = category;
    if (state) query.state = new RegExp(`^${state}$`, "i");
    if (authorSlug) query.authorSlug = authorSlug;
    if (tag) query.tags = tag;
    if (from || to) {
      query.publishedAt = {};
      if (from) query.publishedAt.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        query.publishedAt.$lte = toDate;
      }
    }
    if (q) {
      const needle = q.trim();
      query.$or = [
        { title: { $regex: needle, $options: "i" } },
        { excerpt: { $regex: needle, $options: "i" } },
        { tags: { $regex: needle, $options: "i" } },
        { state: { $regex: needle, $options: "i" } }
      ];
    }

    let articlesQuery = Article.find(query).sort({ publishedAt: -1 });

    if (limit) {
      const lim = parseInt(limit, 10);
      if (!isNaN(lim) && lim > 0) {
        articlesQuery = articlesQuery.limit(lim);
      }
    }

    const articles = await articlesQuery;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get article by slug
// @route   GET /api/articles/:slug
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Get author details
    const author = await Author.findOne({ slug: article.authorSlug });

    // Get related articles (same category or state, excluding current article)
    const related = await Article.find({
      slug: { $ne: article.slug },
      $or: [{ category: article.category }, { state: article.state }]
    }).limit(3);

    // Get adjacent articles (prev/next based on publishedAt)
    const prev = await Article.findOne({
      publishedAt: { $gt: article.publishedAt }
    }).sort({ publishedAt: 1 });

    const next = await Article.findOne({
      publishedAt: { $lt: article.publishedAt }
    }).sort({ publishedAt: -1 });

    res.json({
      article,
      author,
      related,
      adjacent: {
        prev: prev || null,
        next: next || null
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create article
// @route   POST /api/articles
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update article
// @route   PUT /api/articles/:slug
export const updateArticle = async (req, res) => {
  try {
    const updated = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:slug
export const deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
