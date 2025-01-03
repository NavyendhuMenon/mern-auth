import multer from "multer";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // cb(null, path.join(__dirname, '..', 'public', 'uploads')); 

    cb(null, "d:\\Users\\user\\Desktop\\BROTOTYPE\\Week 20\\New Project\\api\\public\\uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

// Multer configuration
export const upload = multer({ storage: storage });
