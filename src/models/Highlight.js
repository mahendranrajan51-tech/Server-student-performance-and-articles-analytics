import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
    text: { type: String, required: true },
    note: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Highlight", highlightSchema);
