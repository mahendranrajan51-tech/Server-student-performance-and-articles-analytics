import { Router } from "express";
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle, uploadArticleMedia } from "../controllers/articleController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { articleUpload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.use(protect);
router.post("/upload", authorize("teacher"), articleUpload.single("file"), uploadArticleMedia);
router.route("/").get(getArticles).post(authorize("teacher"), createArticle);
router.route("/:id").get(getArticle).put(authorize("teacher"), updateArticle).delete(authorize("teacher"), deleteArticle);

export default router;
