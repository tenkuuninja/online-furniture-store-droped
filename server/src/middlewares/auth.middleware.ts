import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ACCESS_TOKEN_SECRET, SALT_ROUNDS } from "../configs/constant";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers?.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      req.user = decoded;
    }
    next();
  } catch (error) {
    next();
  }
};

export const verifyRole = (...allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  if (allowedRoles.includes(req.user?.role)) {
    next();
  }
  res.status(401).json({
    errorMessage: "Unauthenticated",
  });
};
