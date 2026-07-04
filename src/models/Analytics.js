import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    lastViewedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

analyticsSchema.index({ articleId: 1, studentId: 1 }, { unique: true });

export default mongoose.model("Analytics", analyticsSchema);
