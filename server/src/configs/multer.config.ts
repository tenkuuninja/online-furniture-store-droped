import multer from 'multer';

export const imageStore = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/public/images');
  },
  filename: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error('invalid mime type'), '');
    }
    callback(null, Date.now() + " " + file.originalname);
  }
});

