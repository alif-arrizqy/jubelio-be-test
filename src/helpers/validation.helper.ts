const userValidation = (data: any) => {
    if (!data.username) return "Username is required";
    if (!data.password) return "Password is required";
    if (!data.name) return "Name is required";
    return null;
};

const loginValidation = (data: any) => {
    if (!data.username) return "Username is required";
    if (!data.password) return "Password is required";
    return null;
};

export { userValidation, loginValidation };
