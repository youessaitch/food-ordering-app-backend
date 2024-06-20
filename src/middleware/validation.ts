import { body, validationResult } from "express-validator";
import {Request,Response,NextFunction} from 'express';

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//validating name and all
export const validateMyUserRequest = [
    body ("name").isString().notEmpty().withMessage("Name must be a string"),
    body ("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body ("city").isString().notEmpty().withMessage("City must be a string"),
    body ("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
];

//it will validate the request body and after that it will call the next function if there are no errors in the request body then show the errors (code 400) using handleValidationErrors function