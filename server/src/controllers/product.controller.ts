import { Request, Response } from "express";
import Product from "../models/product.model";

class ProductController {
  getListProduct = async (req: Request, res: Response) => {
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

      const products = await Product
        .find()
        .populate("category")
        .sort(sortObject)
        .skip((+page-1)*+size)
        .limit(+size);

      const count = await Product.count();
      
      res.json({
        content: products,
        page: +page,
        size: +size,
        total: count,
        totalPage: Math.ceil(count/+size)
      });
    } catch (error) {
      console.log("ProductController.getListUser error", error);
      res.status(500).json({ errorMessage: "Error" });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const product = await Product.findOne({ _id: id }).populate("category");

      res.json(product);
    } catch (error) {
      console.log("ProductController.getListUser error", error);
      res.status(500).json();
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.create(req.body);

      res.json(product);
    } catch (error) {
      console.log("ProductController.createProduct error", error);
      res.status(500).json({ errorMessage: "Error" });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      await Product.updateOne({ _id: id }, req.body);
      const product = await Product.findOne({ _id: id }).populate("category");

      res.json(product);
    } catch (error) {
      console.log("ProductController.updateProduct error", error);
      res.status(500).send({ errorMessage: "Error" });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const product = await Product.deleteOne({ _id: id });

      res.json(!!product.deletedCount);
    } catch (error) {
      console.log("ProductController.deleteProduct error", error);
      res.status(500).json({ errorMessage: "Error" });
    }
  };
}

export default new ProductController();
