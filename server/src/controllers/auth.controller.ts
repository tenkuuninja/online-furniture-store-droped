import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ACCESS_TOKEN_SECRET, SALT_ROUNDS } from "../configs/constant";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hashPassword = bcrypt.hashSync(req.body?.password, salt);

      const userData = {
        username: req.body?.username,
        password: hashPassword,
        email: req.body?.email,
        name: req.body?.username,
        avatar: "",
        gender: "M",
      };

      const user = await User.create(userData);

      const userResponse = await User.findById(user._id, { password: 0 });
      const accessToken = this.genToken(user);
      res.status(200).json({ accessToken, user: userResponse });
    } catch (error) {
      console.log("auth controller register error >>", error);
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ",
      });
    }
  };

  loginWithPassword = async (req: Request, res: Response) => {
    try {
      const reEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gi;
      const typeLogin = reEmail.test(req.body.username) ? "email" : "username";

      const user = await User.findOne({ [typeLogin]: req.body.username });
      if (!user) {
        return res.status(500).json({
          errorMessage: "Tên đăng nhập hoặc mật khẩu không chính xác",
        });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(500).json({
          errorMessage: "Tên đăng nhập hoặc mật khẩu không chính xác",
        });
      }

      const userResponse = await User.findById(user._id, { password: 0 });
      const accessToken = this.genToken(user);
      return res.status(200).json({ accessToken, user: userResponse });
    } catch (error) {
      console.log("auth controller login error >>", error);
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi",
      });
    }
  };

  checkToken = async (req: Request, res: Response) => {
    try {
      if (!req.user._id) {
        return res.status(401).json({ errorMessage: "Unauthenticated" });
      }
      const user = await User.findById(req.user._id, { password: 0 });
      res.status(200).json({ user });
    } catch (error) {
      console.log("auth controller register error >>", error);
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ",
      });
    }
  };

  private genToken = (user: any): string => {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      ACCESS_TOKEN_SECRET
    );
  };
}

export default new AuthController();
