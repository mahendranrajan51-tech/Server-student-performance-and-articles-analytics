import Highlight from "../models/Highlight.js";

export const saveHighlight = async (req, res, next) => {
  try {
    const { articleId, text, note } = req.body;
    const highlight = await Highlight.create({ studentId: req.user._id, articleId, text, note });
    res.status(201).json(highlight);
  } catch (error) {
    next(error);
  }
};

export const getMyHighlights = async (req, res, next) => {
  try {
    const highlights = await Highlight.find({ studentId: req.user._id })
      .populate("articleId", "title category")
      .sort({ createdAt: -1 });
    res.json(highlights);
  } catch (error) {
    next(error);
  }
};
