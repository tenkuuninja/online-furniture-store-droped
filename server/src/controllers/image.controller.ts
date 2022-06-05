import { Request, Response } from "express";
import { unlinkSync } from "fs";
import request, { CoreOptions } from "request";

const imgbbUploader = require("imgbb-uploader");

class ImageController {
  uploadToImgBB = async (req: Request, res: Response) => {
    if (!req.file?.path) {
      res.status(500).json({ errorMessage: "Không tìm thấy file" });
    }
    try {
      let image = await imgbbUploader(
        process.env.IMGBB_API_KEY || "",
        req.file?.path
      );
      unlinkSync(req.file.path);
      res.status(200).json(image);
    } catch (error) {
      unlinkSync(req.file.path);
      res.status(500).json({ errorMessage: "Đã xảy ra lỗi khi tải file" });
    }
  };
}

export default new ImageController();
