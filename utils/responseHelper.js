// utils/responseHelper.js

function successResponse(data = {}, message = 'Success') {
    return {
        success: true,
        message,
        data,
    };
}

function errorResponse(message = 'An error occurred', data = {}) {
    return {
        success: false,
        message,
        data,
    };
}

module.exports = {
    successResponse,
    errorResponse,
};
