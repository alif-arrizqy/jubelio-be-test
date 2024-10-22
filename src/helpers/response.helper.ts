const successMessage = (code: number = 200, message: string) => {
    return {
        code,
        status: "success",
        message,
    };
}

const successData = (code: number = 200, data: any) => {
    return {
        code,
        status: "success",
        data,
    }
}

const errorMessage = (code: number = 500, message: string) => {
    return {
        code,
        status: "error",
        message,
    };
}

export {
    successMessage,
    successData,
    errorMessage,
}
