import { Router } from "express";
import { getMyHighlights, saveHighlight } from "../controllers/studentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/highlights").get(protect, authorize("student"), getMyHighlights).post(protect, authorize("student"), saveHighlight);

export default router;
