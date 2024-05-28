import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product.controller";
import { validate } from "express-validation";
import productMiddleware from "../middlewares/product.middleware";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(validate(productMiddleware.createProductSchemaValidator), createProduct);

router
  .route("/:id")
  .get(validate(productMiddleware.getProductSchemaValidator), getProductById)
  .put(validate(productMiddleware.getProductSchemaValidator), updateProductById);

export default router;
