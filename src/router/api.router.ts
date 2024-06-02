import * as express from "express";
import {
  addVendorPointProduct,
  createVendorPoint,
  deleteVendorPoint,
  getVendorPointById,
  getVendorPoints,
  removeVendorPointProduct,
  updateVendorPoint,
  updateVendorPointProductOrder,
} from "../controllers/vendorPoint.controller";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { authentification } from "../middleware/auth.middleware";
import {
  createFestival,
  deleteFestival,
  getFestivalById,
  getFestivals,
  updateFestival,
} from "../controllers/festival.controller";

const router = express.Router();

// Routes with authentication and cors
router.get("/festivals", authentification, getFestivals);
router.get("/festivals/:id", authentification, getFestivalById);
router.post("/festivals", authentification, createFestival);
router.put("/festivals/:id", authentification, updateFestival);
router.delete("/festivals/:id", authentification, deleteFestival);

router.post(
  "/vendor-point/:id/product",
  authentification,
  addVendorPointProduct,
);
router.delete(
  "/vendor-point/:id/product/:pid",
  authentification,
  removeVendorPointProduct,
);
router.put(
  "/vendor-point/:id/product/order",
  authentification,
  updateVendorPointProductOrder,
);
router.get("/vendor-points", authentification, getVendorPoints);
router.get("/vendor-point/:id", authentification, getVendorPointById);
router.post("/vendor-point", authentification, createVendorPoint);
router.put("/vendor-point/:id", authentification, updateVendorPoint);
router.delete("/vendor-point/:id", authentification, deleteVendorPoint);

router.get("/products", authentification, getProducts);
router.get("/product/:id", authentification, getProductById);
router.post("/product", authentification, createProduct);
router.put("/product/:id", authentification, updateProduct);
router.delete("/product/:id", authentification, deleteProduct);

export { router as apiRouter };
