export type HttpCodes = 'unknown' | 'Network Error' | 500 | 401;

export type HttpCodesConstant = {
    UNKNOWN: 'unknown';
    NETWORK_ERROR: 'Network Error';
    SUCCESS: 200;
    UNAUTHORIZED: 401;
    INTERNAL_SERVER_ERROR: 500;
};

const HTTP_CODES: HttpCodesConstant = {
    UNKNOWN: 'unknown',
    NETWORK_ERROR: 'Network Error',
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};

export { HTTP_CODES };
