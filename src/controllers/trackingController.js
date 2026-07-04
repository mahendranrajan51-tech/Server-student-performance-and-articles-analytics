import Analytics from "../models/Analytics.js";

export const logArticleView = async (req, res, next) => {
  try {
    const { articleId } = req.body;
    const record = await Analytics.findOneAndUpdate(
      { articleId, studentId: req.user._id },
      { $inc: { views: 1 }, $set: { lastViewedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

export const logReadingDuration = async (req, res, next) => {
  try {
    const { articleId, duration = 0 } = req.body;
    const seconds = Math.max(0, Math.round(Number(duration)));
    const record = await Analytics.findOneAndUpdate(
      { articleId, studentId: req.user._id },
      { $inc: { duration: seconds }, $set: { lastViewedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(record);
  } catch (error) {
    next(error);
  }
};
