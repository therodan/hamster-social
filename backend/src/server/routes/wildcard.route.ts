import { Router } from 'express';

export const wildcardRouter = Router();

wildcardRouter.route('*')
    .all(function (req, res) {
        res.status(404).json({
            code: 404,
            data: null,
            msg: null
        });
    });
