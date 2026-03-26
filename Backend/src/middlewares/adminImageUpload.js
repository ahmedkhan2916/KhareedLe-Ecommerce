import multer from "multer";

const storage = multer.memoryStorage();

const adminImageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
});

export default adminImageUpload;
