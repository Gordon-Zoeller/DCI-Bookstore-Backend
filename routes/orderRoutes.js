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
import { role } from "../middleware/role.js";

const router = Router();

router.get("/allorders", role, getAllOrders); //authorization, role,
router.get("/singleorder/:id", role, getSingleOrder); //authorization, role,
router.get("/getOrdersByUserId/:id", role, getOrdersByUserId); //authorization, role,
router.post("/neworder", createOrder); //authorization, role,
router.patch("/update/:id", role, updateOrder); //authorization, role,
router.delete("/delete/:id", role, deleteOrder); //authorization, role,

export default router;
