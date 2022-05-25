import { Request, Response } from "express";
import User from "../models/user.model";

class UserController {
  getListUser = async (req: Request, res: Response) => {
    try {
      // const users = await User.find({});
      res.json({
        data: [],
        page: 0,
        size: 0,
        total: 0,
        totalPage: 0,
      });
    } catch (error) {
      console.log("UserController.getListUser error", error);
      res.status(500).json();
    }
  };
}

export default new UserController();
