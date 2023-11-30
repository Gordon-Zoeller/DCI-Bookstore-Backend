import { Router } from "express";
import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../controllers/orderController.js";
//import { authorization } from "../middleware/authorisation.js";
//import { role } from "../middleware/role.js";

const router = Router();

router.get("/allorders", getAllOrders); //authorization, role,
router.get("/singleorder/:id", getSingleOrder); //authorization, role,
router.get("/getOrdersByUserId/:id", getOrdersByUserId); //authorization, role,
router.post("/neworder", createOrder); //authorization, role,
router.patch("/update/:id", updateOrder); //authorization, role,
router.delete("/delete/:id", deleteOrder); //authorization, role,

export default router;
