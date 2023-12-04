import {body, validationResult} from "express-validator";
import {capitalize} from "../helpers/capitalize.js";

const validation = [
    body("email")
        .exists()
        .withMessage("Please make sure to include your email.")
        .trim()
        .isEmail()
        .withMessage("Please make sure your email is correct.")
        .normalizeEmail(),
    body("password")
        .exists()
        .trim()
        .isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false})
        .withMessage("Please make sure your password is at least 8 characters long and includes at least 1 lowercase, 1 uppercase letter, 1 number, and 1 symbol"),
    body("firstName")
        .exists()
        .withMessage("Please make sure to include your first name.")
        .trim()
        .escape()
        .isAlpha()
        .withMessage("Please make sure you only use letters."),
    body("lastName")
        .exists()
        .withMessage("Please make sure to include your last name.")
        .trim()
        .escape()
        .isAlpha()
        .withMessage("Please make sure you only use letters."),
    (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            req.body.firstName = capitalize(req.body.firstName);
            req.body.lastName = capitalize(req.body.lastName);
            next();
        } else {
            res.status(400).json(errors);
        };
    }
];

export {validation};