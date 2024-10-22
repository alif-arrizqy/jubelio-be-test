const successMessage = (message: string, code: number = 200) => {
    return {
        statusCode: code,
        status: "success",
        message,
    };
};

const successData = (data: any, code: number = 200) => {
    return {
        statusCode: code,
        status: "success",
        data,
    };
};

const errorMessage = (errorType: string, message: string, code: number = 500) => {
    return {
        statusCode: code,
        error: errorType,
        message,
    };
};

export { successMessage, successData, errorMessage };
