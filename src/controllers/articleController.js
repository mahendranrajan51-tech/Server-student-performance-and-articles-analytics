import Article from "../models/Article.js";

export const createArticle = async (req, res, next) => {
  try {
    const article = await Article.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const { category, search, mine } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (mine === "true" && req.user.role === "teacher") filter.createdBy = req.user._id;
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { "contentBlocks.value": { $regex: search, $options: "i" } }
    ];

    const articles = await Article.find(filter).populate("createdBy", "name").sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).populate("createdBy", "name");
    if (!article) {
      const error = new Error("Article not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      const error = new Error("Article not found or not owned by teacher");
      error.statusCode = 404;
      throw error;
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!article) {
      const error = new Error("Article not found or not owned by teacher");
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    next(error);
  }
};
