import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";

const authorization = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if(payload) {
            const user = await UserModel.findById(payload._id);
            req.user = user;
            next();
        };
    } catch (error) {
        next(error);
    };
};

export {authorization};