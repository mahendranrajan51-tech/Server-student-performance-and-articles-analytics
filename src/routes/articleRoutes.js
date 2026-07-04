import { Router } from "express";
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle } from "../controllers/articleController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").get(getArticles).post(authorize("teacher"), createArticle);
router.route("/:id").get(getArticle).put(authorize("teacher"), updateArticle).delete(authorize("teacher"), deleteArticle);

export default router;
