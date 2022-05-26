import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { SALT_ROUNDS } from "../configs/constant";

class UserController {
  getListUser = async (req: Request, res: Response) => {
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

      const users = await User
        .find()
        .sort(sortObject)
        .skip((+page-1)*+size)
        .limit(+size);

      const count = await User.count();
      
      res.json({
        data: users,
        page: +page,
        size: +size,
        total: count,
        totalPage: Math.ceil(count/+size)
      });
    } catch (error) {
      console.log("UserController.getListUser error", error);
      res.status(500).json();
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const user = await User.findOne({ _id: id });

      res.json(user);
    } catch (error) {
      console.log("UserController.getUser error", error);
      res.status(500).json();
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const checkExist = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (checkExist) {
        return res
          .status(500)
          .json({ msg: "username or email already exist!" });
      }

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hashPassword = bcrypt.hashSync(req.body?.password, salt);

      const newUserData = {
        username: req.body?.username,
        password: hashPassword,
        email: req.body?.email,
        name: req.body?.name,
        avatar: req.body?.avatar,
        gender: req.body?.gender === "F" ? "F" : "M",
      };

      const user = await User.create(newUserData);

      res.json(user);
    } catch (error) {
      console.log("UserController.createUser error", error);
      res.status(500).json();
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const currentUser = await User.findOne({ _id: id });

      const checkExist = await User.findOne({
        $or: [
          {
            $and: [
              { email: { $ne: currentUser?.email } },
              { email: req.body.email },
            ],
          },
          {
            $and: [
              { username: { $ne: currentUser?.username } },
              { username: req.body.username },
            ],
          },
        ],
      });

      if (checkExist) {
        return res
          .status(500)
          .json({ msg: "username or email must not duplicate!" });
      }

      
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hashPassword = bcrypt.hashSync(req.body?.password, salt);

      const userData = {
        username: req.body?.username,
        password: hashPassword,
        email: req.body?.email,
        name: req.body?.name,
        avatar: req.body?.avatar,
        gender: req.body?.gender === "F" ? "F" : "M",
      };

      await User.updateOne({ _id: id }, userData);
      const user = await User.findOne({ _id: id });

      res.json(user);
    } catch (error) {
      console.log("UserController.updateUser error", error);
      res.status(500).send(error);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      let id = req.params.id;

      const user = await User.deleteOne({ _id: id });

      res.json(!!user.deletedCount);
    } catch (error) {
      console.log("UserController.deleteUser error", error);
      res.status(500).json(false);
    }
  };
}

export default new UserController();
