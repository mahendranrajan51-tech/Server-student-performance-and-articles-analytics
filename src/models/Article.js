import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["text", "image", "video", "3d"], required: true },
    value: { type: String, required: true },
    caption: { type: String, default: "" }
  },
  { _id: true }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    contentBlocks: { type: [contentBlockSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
