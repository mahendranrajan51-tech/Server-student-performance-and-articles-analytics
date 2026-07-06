import fs from "fs";
import multer from "multer";
import path from "path";

const uploadRoot = path.resolve("uploads", "articles");

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "model/gltf+json",
  "model/gltf-binary",
  "application/octet-stream"
]);

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".ogg", ".glb", ".gltf", ".obj", ".fbx"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadRoot),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, extension).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    cb(null, `${Date.now()}-${safeBase}${extension}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedMimeTypes.has(file.mimetype) && allowedExtensions.has(extension)) {
    cb(null, true);
    return;
  }
  cb(new Error("Only image, video, and 3D model files are allowed"));
};

export const articleUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }
});
