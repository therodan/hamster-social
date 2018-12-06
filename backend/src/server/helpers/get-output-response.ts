export function getOutputResponse(data = null, code = 200, msg?: string) {
    return {
        code,
        msg,
        data
    };
}

export function getErrorOutputResponse(msg = 'Internal server error', code = 500, data = null) {
    return getOutputResponse(data, code, msg);
}
