import Author from "../models/Author.js";
import Article from "../models/Article.js";

// @desc    Get all authors
// @route   GET /api/authors
export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get author by slug
// @route   GET /api/authors/:slug
export const getAuthorBySlug = async (req, res) => {
  try {
    const author = await Author.findOne({ slug: req.params.slug });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const articles = await Article.find({ authorSlug: author.slug }).sort({
      publishedAt: -1,
    });

    res.json({
      author,
      articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
