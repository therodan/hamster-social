import { getErrorOutputResponse } from '../helpers/index';

export function errorHandler(err, req, res, next) {
    console.error(err);

    return res.status(500).json(getErrorOutputResponse());
}
