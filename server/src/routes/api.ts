import express from "express";
import multer from "multer";
import auth from "../controllers/auth.controller";
import user from "../controllers/user.controller";
import categories from "../controllers/category.controller";
import product from "../controllers/product.controller";
import bill from "../controllers/bill.controller";
import image from "../controllers/image.controller";
import { checkAuth, verifyRole } from "../middlewares/auth.middleware";
import { imageStore } from "../configs/multer.config";

const router = express.Router();

router.use(checkAuth);

router.post("/register", auth.register);
router.post("/login", auth.loginWithPassword);
router.post("/token", auth.checkToken);

router.post(
  "/upload",
  multer({ storage: imageStore }).single("file"),
  image.uploadToImgBB
);

router.get("/users", user.getListUser);
router.post("/users", user.createUser);
router.get("/users/:id", user.getUser);
router.put("/users/:id", user.updateUser);
router.delete("/users/:id", user.deleteUser);

router.get("/categories", categories.getListCategory);
router.post("/categories", categories.createCategory);
router.get("/categories/:id", categories.getCategory);
router.put("/categories/:id", categories.updateCategory);
router.delete("/categories/:id", categories.deleteCategory);

router.get("/products", product.getListProduct);
router.post("/products", product.createProduct);
router.get("/products/:id", product.getProduct);
router.put("/products/:id", product.updateProduct);
router.delete("/products/:id", product.deleteProduct);

router.get("/bills", bill.getListBill);
router.post("/bills", bill.createBill);
router.get("/bills/:id", bill.getBill);
router.put("/bills/:id", bill.updateBill);
router.delete("/bills/:id", bill.deleteBill);

export default router;
