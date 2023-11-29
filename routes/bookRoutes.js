import express from "express";
import { createBook, deleteBook, getBooks, searchBook, updateBook } from "../controllers/bookController.js";

const route = express.Router();

route.get("/", getBooks);
route.get("/search/:regex", searchBook)
route.post("/create", createBook);
route.patch("/update/:id", updateBook);
route.delete("/delete/:id", deleteBook);

export default route;