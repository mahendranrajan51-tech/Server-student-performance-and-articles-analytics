import mongoose from "mongoose";
import Article from "../models/Article.js";
import Analytics from "../models/Analytics.js";
import Highlight from "../models/Highlight.js";

export const teacherAnalytics = async (req, res, next) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.user._id);
    const articles = await Article.find({ createdBy: teacherId }).select("_id title category createdAt");
    const articleIds = articles.map((article) => article._id);

    const [articleViews, categoryStats, dailyEngagement, studentsRead] = await Promise.all([
      Analytics.aggregate([
        { $match: { articleId: { $in: articleIds } } },
        { $group: { _id: "$articleId", views: { $sum: "$views" }, duration: { $sum: "$duration" } } }
      ]),
      Analytics.aggregate([
        { $match: { articleId: { $in: articleIds } } },
        { $lookup: { from: "articles", localField: "articleId", foreignField: "_id", as: "article" } },
        { $unwind: "$article" },
        { $group: { _id: "$article.category", views: { $sum: "$views" }, duration: { $sum: "$duration" } } },
        { $sort: { views: -1 } }
      ]),
      Analytics.aggregate([
        { $match: { articleId: { $in: articleIds } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastViewedAt" } }, views: { $sum: "$views" }, duration: { $sum: "$duration" } } },
        { $sort: { _id: 1 } }
      ]),
      Analytics.distinct("studentId", { articleId: { $in: articleIds } })
    ]);

    const viewMap = new Map(articleViews.map((item) => [item._id.toString(), item]));
    res.json({
      cards: {
        articlesCreated: articles.length,
        totalStudentsRead: studentsRead.length,
        totalViews: articleViews.reduce((sum, item) => sum + item.views, 0)
      },
      articleViews: articles.map((article) => ({
        articleId: article._id,
        title: article.title,
        category: article.category,
        views: viewMap.get(article._id.toString())?.views || 0
      })),
      categoryStats,
      topCategories: categoryStats.slice(0, 3),
      dailyEngagement
    });
  } catch (error) {
    next(error);
  }
};

export const studentAnalytics = async (req, res, next) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.user._id);
    const [timePerCategory, readArticles, highlights] = await Promise.all([
      Analytics.aggregate([
        { $match: { studentId } },
        { $lookup: { from: "articles", localField: "articleId", foreignField: "_id", as: "article" } },
        { $unwind: "$article" },
        { $group: { _id: "$article.category", duration: { $sum: "$duration" }, views: { $sum: "$views" } } },
        { $sort: { duration: -1 } }
      ]),
      Analytics.find({ studentId }).populate("articleId", "title category").sort({ lastViewedAt: -1 }),
      Highlight.find({ studentId }).populate("articleId", "title category").sort({ createdAt: -1 })
    ]);

    res.json({
      cards: {
        totalArticlesRead: readArticles.length,
        totalReadingTime: readArticles.reduce((sum, item) => sum + item.duration, 0)
      },
      timePerCategory,
      readArticles,
      highlights
    });
  } catch (error) {
    next(error);
  }
};
