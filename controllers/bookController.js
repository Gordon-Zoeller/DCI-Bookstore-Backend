import BookModel from "../models/bookSchema.js";

const getBooks = async (req, res, next) => {
    try {
        const books = await BookModel.find();
        res.json({success: true, data: books});
    } catch (error) {
        next(error);
    };
};

const searchBook = async (req, res, next) => {
    try {
        const book = await BookModel.find({$or: [{title: {$regex: req.params.regex}}, {"author.firstName": {$regex: req.params.regex}}, {"author.lastName": {$regex: req.params.regex}}]});
        res.json({success:true, data: book});
    } catch (error) {
        next(error);
    };
};

const createBook = async (req, res, next) => {
    try {
        const book = await BookModel.create(req.body);
        res.json({success: true, data: book});
    } catch (error) {
        next(error);
    };
};

const updateBook = async (req, res, next) => {
    try {
        const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({success: true, data: book});
    } catch (error) {
        next(error);
    };
};

const deleteBook = async (req, res, next) => {
    try {
        await BookModel.findByIdAndDelete(req.params.id);
        res.json({success: true, message: "The book was successfully deleted."});
    } catch (error) {
        next(error);
    };
};

export {getBooks, searchBook, createBook, updateBook, deleteBook};