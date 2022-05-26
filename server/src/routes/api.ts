import express from "express";
import user from "../controllers/user.controller";
import categories from "../controllers/category.controller";
import product from "../controllers/product.controller";

const router = express.Router();

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

export default router;
