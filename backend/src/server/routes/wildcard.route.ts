import { Router } from 'express';

export const wildcardRouter = Router();

wildcardRouter.route('*')
    // Handle all other routes
    .all(function (req, res) {
        res.status(404).json({
            code: 404,
            data: null,
            msg: null
        });
    });
