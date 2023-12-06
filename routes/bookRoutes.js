import express from "express";
import { bookbyid, createBook, deleteBook, getBooks, searchBook, updateBook } from "../controllers/bookController.js";
import { authorization } from "../middleware/authorisation.js";
import { role } from "../middleware/role.js";

const route = express.Router();

route.get("/", getBooks);
route.get("/search/:regex", searchBook);
route.get("/bookbyid/:id", bookbyid);
route.post("/create", authorization, role, createBook);
route.patch("/update/:id", authorization, role, updateBook);
route.delete("/delete/:id", authorization, role, deleteBook);

export default route;