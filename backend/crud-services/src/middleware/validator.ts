import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Middleware genérico para validar los datos
export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};