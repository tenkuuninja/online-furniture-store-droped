import express from "express";
import user from "../controllers/user.controller";

const router = express.Router();

router.get("/users", user.getListUser);

export default router;
