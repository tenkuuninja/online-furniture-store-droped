import { Request, Response } from "express";
import Category from "../models/category.model";

class CategoryController {
  getListCategory = async (req: Request, res: Response) => {
    try {
      const { page = 1, size = 10, sort } = req.query;

      if (isNaN(+page) || Array.isArray(page) || isNaN(+size) || Array.isArray(size)) {
        return res.status(500).json({ msg: "`page` and `size` must be number" });
      }

      const searchObject: any[] = [];
      const sortObject: any = {};

      if (typeof sort == "string") {
        for (let sortItem of sort.split(",")) {
          if (sortItem.length > 1 && sortItem.startsWith("-")) {
            sortObject[sortItem.substring(1)] = -1;
          } else {
            sortObject[sortItem] = 1;
          }
        }
      }

      const categories = await Category
        .find()
        .sort(sortObject)
        .skip((+page-1)*+size)
        .limit(+size);

      const count = await Category.count();
      
      res.json({
        data: categories,
        page: +page,
        size: +size,
        total: count,
        totalPage: Math.ceil(count/+size)
      });
    } catch (error) {
      console.log("CategoryController.getListCategory error", error);
      res.status(500).json({ msg: "Error" });
    }
  };

  getCategory = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const category = await Category.findOne({ _id: id });

      res.json(category);
    } catch (error) {
      console.log("CategoryController.getCategory error", error);
      res.status(500).json();
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const category = await Category.create(req.body);

      res.json(category);
    } catch (error) {
      console.log("CategoryController.createCategory error", error);
      res.status(500).json({ msg: "Error" });
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      await Category.updateOne({ _id: id }, req.body);
      const category = await Category.findOne({ _id: id });

      res.json(category);
    } catch (error) {
      console.log("CategoryController.updateCategory error", error);
      res.status(500).send({ msg: "Error" });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const category = await Category.deleteOne({ _id: id });

      res.json(!!category.deletedCount);
    } catch (error) {
      console.log("CategoryController.deleteCategory error", error);
      res.status(500).json(false);
    }
  };
}

export default new CategoryController();
