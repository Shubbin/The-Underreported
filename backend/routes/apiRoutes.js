import express from "express";
import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle
} from "../controllers/articlesController.js";
import {
  getAuthors,
  getAuthorBySlug
} from "../controllers/authorsController.js";
import {
  subscribeNewsletter,
  submitContactMessage
} from "../controllers/submissionsController.js";

const router = express.Router();

// Articles
router.get("/articles", getArticles);
router.get("/articles/:slug", getArticleBySlug);
router.post("/articles", createArticle);
router.put("/articles/:slug", updateArticle);
router.delete("/articles/:slug", deleteArticle);

// Authors
router.get("/authors", getAuthors);
router.get("/authors/:slug", getAuthorBySlug);

// Submissions
router.post("/newsletter", subscribeNewsletter);
router.post("/contact", submitContactMessage);

export default router;
