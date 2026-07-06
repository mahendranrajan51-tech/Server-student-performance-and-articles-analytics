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

  // Create Teachers
  const teachers = await User.create([
    { name: "Dr. Kavitha", role: "teacher", email: "teacher@example.com", password: "password123" }
  ]);

  // Create Students
  const students = await User.create([
    { name: "Arun Kumar", role: "student", email: "student@example.com", password: "password123" },
    { name: "Rajesh Patel", role: "student", email: "rajesh@example.com", password: "password123" },
  ]);

  const articles = await Article.create([
    // Science Category
    {
      title: "Forces Around Us",
      category: "Science",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "A force can push, pull, stop, or change the direction of an object. Forces are everywhere in our daily lives. When you kick a football, you apply a force. Gravity is a force that pulls objects toward Earth. Friction is a force that slows things down." },
        { type: "image", value: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", caption: "Science lab exploring forces" },
        { type: "video", value: "https://www.youtube.com/embed/w1Y4m3kR9kM", caption: "Understanding Forces - Educational Animation" },
        { type: "text", value: "Newton's First Law: Objects in motion stay in motion unless acted upon by a force. This principle governs all movement in the universe." }
      ]
    },
    {
      title: "Photosynthesis: Life's Energy Factory",
      category: "Science",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Photosynthesis is the process where plants convert sunlight into chemical energy. It's the foundation of life on Earth, providing oxygen and food for all living organisms." },
        { type: "image", value: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", caption: "Lush green plants performing photosynthesis" },
        { type: "video", value: "https://www.youtube.com/embed/tiyY9fDUEn8", caption: "How Photosynthesis Works" },
        { type: "3d", value: "https://sketchfab.com/models/9d72bef8098a4b0a9fbcbc80b9e9e6cc/embed", caption: "3D Model of Photosynthesis Process" }
      ]
    },
    {
      title: "The Water Cycle",
      category: "Science",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Water continuously moves between Earth's surface and the atmosphere through evaporation, condensation, and precipitation. This cycle is essential for life." },
        { type: "image", value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", caption: "Water cycle in nature" },
        { type: "video", value: "https://www.youtube.com/embed/gCPcXw_Z4v0", caption: "The Water Cycle Explained" }
      ]
    },

    // Math Category
    {
      title: "Fractions in Real Life",
      category: "Math",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Fractions describe equal parts of a whole. Recipes, maps, and classroom groups are practical places to spot them. Understanding fractions is crucial for advanced mathematics." },
        { type: "image", value: "https://images.unsplash.com/photo-1596521821921-2b72c8c1a5ab?auto=format&fit=crop&w=1200&q=80", caption: "Visual representation of fractions" },
        { type: "video", value: "https://www.youtube.com/embed/P8tL2gNYt08", caption: "Fractions Fundamentals" },
        { type: "3d", value: "https://sketchfab.com/models/7w7pAfrCfjovwykkEeRFLGw5SXS/embed", caption: "Interactive 3D fraction models" }
      ]
    },
    {
      title: "Geometry Basics: Shapes and Angles",
      category: "Math",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Geometry is the study of shapes, sizes, and properties of figures. Understanding angles and their relationships helps solve real-world problems in construction, design, and navigation." },
        { type: "image", value: "https://images.unsplash.com/photo-1537740904195-e21a3f6df0fb?auto=format&fit=crop&w=1200&q=80", caption: "Geometric shapes and patterns" },
        { type: "video", value: "https://www.youtube.com/embed/w5K5P3w3AeQ", caption: "Introduction to Geometry" },
        { type: "text", value: "Common geometric shapes: Triangle (3 sides), Square (4 equal sides), Circle (curved, no sides). Each shape has unique properties." }
      ]
    },
    {
      title: "Decimals and Percentages",
      category: "Math",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Decimals are numbers with a decimal point representing values less than one. Percentages are fractions expressed as parts of 100. These concepts are vital in real-world calculations." },
        { type: "image", value: "https://images.unsplash.com/photo-1555949018-dfa89ebf9330?auto=format&fit=crop&w=1200&q=80", caption: "Mathematical calculations" },
        { type: "video", value: "https://www.youtube.com/embed/15S29H2FPkE", caption: "Understanding Percentages" }
      ]
    },

    // English Category
    {
      title: "Writing Clear Paragraphs",
      category: "English",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "A strong paragraph usually has one main idea, supporting details, and a closing sentence that completes the thought. Each sentence should connect logically to the next." },
        { type: "image", value: "https://images.unsplash.com/photo-1455849318743-68233fe4934d?auto=format&fit=crop&w=1200&q=80", caption: "Creative writing workspace" },
        { type: "video", value: "https://www.youtube.com/embed/OV5J2RmO2R8", caption: "Paragraph Writing Tips" }
      ]
    },
    {
      title: "Grammar Fundamentals",
      category: "English",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Grammar is the system and structure of a language. Understanding parts of speech, sentence structure, and punctuation is essential for clear communication." },
        { type: "image", value: "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=1200&q=80", caption: "Grammar concept visualization" },
        { type: "video", value: "https://www.youtube.com/embed/j8UiBhFoY2s", caption: "English Grammar Basics" },
        { type: "text", value: "Parts of speech include: Nouns (people, places, things), Verbs (actions), Adjectives (descriptions), and more. Mastering these helps in writing effectively." }
      ]
    },
    {
      title: "Shakespeare's Literary Impact",
      category: "English",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "William Shakespeare revolutionized English literature with his plays and sonnets. His work continues to influence writers and performers worldwide." },
        { type: "image", value: "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=1200&q=80", caption: "Shakespeare's legacy in literature" },
        { type: "video", value: "https://www.youtube.com/embed/kPHI1GDjR5Y", caption: "Shakespeare's Works Explained" }
      ]
    },

    // History Category
    {
      title: "Ancient Civilizations: Egypt",
      category: "History",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Ancient Egypt was one of the world's greatest civilizations, lasting over 3000 years. The Egyptians built magnificent pyramids, developed writing, and created a complex society." },
        { type: "image", value: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=1200&q=80", caption: "The Great Pyramids of Giza" },
        { type: "video", value: "https://www.youtube.com/embed/RY_oZRBjNGI", caption: "Ancient Egypt Documentary" },
        { type: "3d", value: "https://sketchfab.com/models/0dd277b1834a4d5c93368ae0f308fa4b/embed", caption: "3D Model of Egyptian Pyramid" }
      ]
    },
    {
      title: "The Industrial Revolution",
      category: "History",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "The Industrial Revolution transformed society from agrarian to industrial. New technologies and manufacturing processes changed how people lived and worked." },
        { type: "image", value: "https://images.unsplash.com/photo-1518611505868-48c78d3a4407?auto=format&fit=crop&w=1200&q=80", caption: "Industrial Revolution machinery" },
        { type: "video", value: "https://www.youtube.com/embed/y9K3J_yF37w", caption: "Industrial Revolution Overview" }
      ]
    },

    // Geography Category
    {
      title: "Continents and Oceans",
      category: "Geography",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Earth has seven continents and five oceans. Understanding their locations, characteristics, and populations is fundamental to world geography." },
        { type: "image", value: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80", caption: "World map showing continents" },
        { type: "video", value: "https://www.youtube.com/embed/mJBHXc8dM80", caption: "World Continents and Oceans" },
        { type: "3d", value: "https://sketchfab.com/models/4c473d0dafb24af382b72e2981201a75/embed", caption: "3D Interactive Globe" }
      ]
    },
    {
      title: "Climate Zones Around the World",
      category: "Geography",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Earth has distinct climate zones: tropical, temperate, and polar. Each zone has unique weather patterns, vegetation, and wildlife." },
        { type: "image", value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", caption: "Diverse climate zones" },
        { type: "video", value: "https://www.youtube.com/embed/jtqI3eWlx84", caption: "Climate Zones Explained" }
      ]
    },

    // Art Category
    {
      title: "Color Theory and Composition",
      category: "Art",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Color theory explores how colors interact and influence our perception. Understanding composition helps create visually balanced artwork." },
        { type: "image", value: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80", caption: "Color palette in art" },
        { type: "video", value: "https://www.youtube.com/embed/dGVdWQEnvhs", caption: "Color Theory Fundamentals" },
        { type: "text", value: "Primary colors (red, yellow, blue) combine to create all other colors. Secondary colors are made from primary colors. Tertiary colors result from mixing primary and secondary colors." }
      ]
    },

    // Physical Education Category
    {
      title: "Sports Fundamentals and Fitness",
      category: "Physical Education",
      createdBy: teachers[0]._id,
      contentBlocks: [
        { type: "text", value: "Physical fitness involves cardiovascular endurance, strength, flexibility, and balance. Regular exercise improves both physical and mental health." },
        { type: "image", value: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=1200&q=80", caption: "Sports training and fitness" },
        { type: "video", value: "https://www.youtube.com/embed/bnHvj7l00Ks", caption: "Fitness Basics and Training" }
      ]
    }
  ]);

  // Create Analytics data for all students and articles
  const analyticsData = [];
  for (let i = 0; i < articles.length; i++) {
    for (let j = 0; j < students.length; j++) {
      analyticsData.push({
        articleId: articles[i]._id,
        studentId: students[j]._id,
        views: Math.floor(Math.random() * 5) + 1,
        duration: Math.floor(Math.random() * 600) + 60,
        lastViewedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      });
    }
  }

  await Analytics.create(analyticsData);

  // Create highlights for various students
  const highlightSamples = [
    {
      studentId: students[0]._id,
      articleId: articles[0]._id,
      text: "A force can push, pull, stop, or change the direction of an object.",
      note: "Important definition to remember"
    },
    {
      studentId: students[0]._id,
      articleId: articles[1]._id,
      text: "Photosynthesis is the process where plants convert sunlight into chemical energy.",
      note: "Key concept for exam revision"
    },
    {
      studentId: students[0]._id,
      articleId: articles[3]._id,
      text: "Fractions describe equal parts of a whole.",
      note: "Foundation for understanding proportions"
    },
    {
      studentId: students[0]._id,
      articleId: articles[6]._id,
      text: "A strong paragraph usually has one main idea, supporting details, and a closing sentence.",
      note: "Remember for essay writing"
    }
  ];

  await Highlight.create(highlightSamples);

  console.log("\n✅ Seed Data Complete!\n");
  console.log("📚 Teachers Created: 1");
  console.log("👥 Students Created: 2");
  console.log("📄 Articles Created: 13 (across 8 categories)");
  console.log("📊 Analytics Records: " + analyticsData.length);
  console.log("\n🔐 Login Credentials:\n");
  
  console.log("Teachers:");
  console.log("  • Dr. Kavitha - teacher@example.com / password123");
  
  console.log("\nStudents (sample):");
  console.log("  • Arun Kumar - student@example.com / password123");
  console.log("  • Rajesh Patel - rajesh@example.com / password123");


  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
