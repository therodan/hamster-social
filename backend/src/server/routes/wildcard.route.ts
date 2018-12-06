import { Router } from 'express';
import { getOutputResponse } from '../helpers';

export const wildcardRouter = Router();

wildcardRouter.route('*')
    .all(function (req, res) {
        res.status(404).json(getOutputResponse(null, 404, 'Not found'));
    });
