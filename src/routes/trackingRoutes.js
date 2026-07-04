import { Router } from "express";
import { logArticleView, logReadingDuration } from "../controllers/trackingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/view", protect, authorize("student"), logArticleView);
router.put("/duration", protect, authorize("student"), logReadingDuration);

export default router;
