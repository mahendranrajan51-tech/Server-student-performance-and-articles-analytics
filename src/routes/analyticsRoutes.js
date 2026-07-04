import { Router } from "express";
import { studentAnalytics, teacherAnalytics } from "../controllers/analyticsController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/teacher", protect, authorize("teacher"), teacherAnalytics);
router.get("/student", protect, authorize("student"), studentAnalytics);

export default router;
