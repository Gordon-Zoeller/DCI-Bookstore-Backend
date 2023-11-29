import { Router } from "express";

import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../controllers/orderController.js";

const router = Router();

router.get("/allorders", getAllOrders);
router.get("/singleorder/:id", getSingleOrder);
router.get("/getOrdersByUserId/:id", getOrdersByUserId);
router.post("/neworder", createOrder);
router.patch("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

export default router;
