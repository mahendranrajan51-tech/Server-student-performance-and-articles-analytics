import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Article from "../models/Article.js";
import Analytics from "../models/Analytics.js";
import Highlight from "../models/Highlight.js";

dotenv.config();

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Article.deleteMany(), Analytics.deleteMany(), Highlight.deleteMany()]);

  const teacher = await User.create({
    name: "Dr. Kavitha",
    role: "teacher",
    email: "teacher@example.com",
    password: "password123"
  });

  const [studentA, studentB] = await User.create([
    { name: "Arun Kumar", role: "student", email: "student@example.com", password: "password123" },
    { name: "Meera S", role: "student", email: "meera@example.com", password: "password123" }
  ]);

  const articles = await Article.create([
    {
      title: "Forces Around Us",
      category: "Science",
      createdBy: teacher._id,
      contentBlocks: [
        { type: "text", value: "A force can push, pull, stop, or change the direction of an object. Notice how daily examples reveal invisible interactions." },
        { type: "image", value: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", caption: "Science lab activity" },
        { type: "video", value: "https://www.youtube.com/embed/w1Y4m3kR9kM", caption: "Forces introduction" }
      ]
    },
    {
      title: "Fractions in Real Life",
      category: "Math",
      createdBy: teacher._id,
      contentBlocks: [
        { type: "text", value: "Fractions describe equal parts of a whole. Recipes, maps, and classroom groups are practical places to spot them." },
        { type: "3d", value: "https://sketchfab.com/models/7w7pAfrCfjovwykkEeRFLGw5SXS/embed", caption: "3D fraction visual" }
      ]
    },
    {
      title: "Writing Clear Paragraphs",
      category: "English",
      createdBy: teacher._id,
      contentBlocks: [
        { type: "text", value: "A strong paragraph usually has one main idea, supporting details, and a closing sentence that completes the thought." }
      ]
    }
  ]);

  await Analytics.create([
    { articleId: articles[0]._id, studentId: studentA._id, views: 3, duration: 420, lastViewedAt: new Date() },
    { articleId: articles[1]._id, studentId: studentA._id, views: 2, duration: 260, lastViewedAt: new Date() },
    { articleId: articles[0]._id, studentId: studentB._id, views: 1, duration: 180, lastViewedAt: new Date(Date.now() - 86400000) },
    { articleId: articles[2]._id, studentId: studentB._id, views: 2, duration: 310, lastViewedAt: new Date(Date.now() - 172800000) }
  ]);

  await Highlight.create({
    studentId: studentA._id,
    articleId: articles[0]._id,
    text: "A force can push, pull, stop, or change the direction of an object.",
    note: "Good definition for revision."
  });

  console.log("Seed complete");
  console.log("Teacher: teacher@example.com / password123");
  console.log("Student: student@example.com / password123");
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
