export function errorHandler(err, req, res, next) {
    console.error('ERROR', err);

    return res.status(500).json({
        code: 500,
        data: null,
        msg: 'Internal server error'
    });
}
