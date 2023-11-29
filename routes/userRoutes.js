// import express from 'express';
// const router = express.Router();

import {Router} from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/userController.js";

const router = Router();


router.get("/allusers", getAllUsers);
router.get("/singleuser/:id", getUserById);
router.post("/new", createUser);
router.patch('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);

export default router;