import { Request, Response } from "express";
import Bill from "../models/bill.model";

class BillController {
  getListBill = async (req: Request, res: Response) => {
    try {
      const { page = 1, size = 10, sort } = req.query;

      if (
        isNaN(+page) ||
        Array.isArray(page) ||
        isNaN(+size) ||
        Array.isArray(size)
      ) {
        return res
          .status(500)
          .json({ msg: "`page` and `size` must be number" });
      }

      const searchObject: any[] = [];
      const sortObject: any = {};
      const populateObject = ["user",{ path: "detail", populate: "product" }];

      if (typeof sort == "string") {
        for (let sortItem of sort.split(",")) {
          if (sortItem.length > 1 && sortItem.startsWith("-")) {
            sortObject[sortItem.substring(1)] = -1;
          } else {
            sortObject[sortItem] = 1;
          }
        }
      }

      const bills = await Bill.find()
        .populate(populateObject)
        .sort(sortObject)
        .skip((+page - 1) * +size)
        .limit(+size);

      const count = await Bill.count();

      res.json({
        data: bills,
        page: +page,
        size: +size,
        total: count,
        totalPage: Math.ceil(count / +size),
      });
    } catch (error) {
      console.log("BillController.getListBill error", error);
      res.status(500).json({ msg: "Error" });
    }
  };

  getBill = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const populateObject = ["user",{ path: "detail", populate: "product" }];

      const bill = await Bill.findOne({ _id: id }).populate(populateObject);

      res.json(bill);
    } catch (error) {
      console.log("BillController.getBill error", error);
      res.status(500).json();
    }
  };

  createBill = async (req: Request, res: Response) => {
    try {
      const bill = await Bill.create(req.body);

      res.json(bill);
    } catch (error) {
      console.log("BillController.createBill error", error);
      res.status(500).json({ msg: "Error" });
    }
  };

  updateBill = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const populateObject = ["user",{ path: "detail", populate: "product" }];

      await Bill.updateOne({ _id: id }, req.body);
      const bill = await Bill.findOne({ _id: id }).populate(populateObject);

      res.json(bill);
    } catch (error) {
      console.log("BillController.updateBill error", error);
      res.status(500).send({ msg: "Error" });
    }
  };

  deleteBill = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const bill = await Bill.deleteOne({ _id: id });

      res.json(!!bill.deletedCount);
    } catch (error) {
      console.log("BillController.deleteBill error", error);
      res.status(500).json(false);
    }
  };
}

export default new BillController();
