// import express from 'express';
// const router = express.Router();

import {Router} from "express";
import { register, deleteUserById, getAllUsers, getUserById, updateUserById, login } from "../controllers/userController.js";
import { authorization } from "../middleware/authorisation.js";
import { role } from "../middleware/role.js";
import { validation } from "../middleware/validation.js";

const router = Router();

router.get("/allusers", authorization, role, getAllUsers);
router.get("/singleuser/:id", authorization, role, getUserById);
router.post("/register", validation, register);
router.post("/login", login);
router.patch('/update/:id', authorization, role, updateUserById);
router.delete('/delete/:id', authorization, role, deleteUserById);

router.get("/verifytoken", authorization, (req, res) => {
    res.json({success: true, data: req.user});
});

export default router;

//"aXtO8Z:rgPqjfXFT"