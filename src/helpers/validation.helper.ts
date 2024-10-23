// Define interfaces for the expected data structures
interface UserData {
    username: string;
    password: string;
    name: string;
    role: number;
}

interface LoginData {
    username: string;
    password: string;
}

interface ProductData {
    name: string;
    price: number;
}

interface RoleData {
    name: string;
}

interface LocationData {
    name: string;
    address: string;
    capacity: number;
}

// Validation function for user registration
const userValidation = (data: UserData): string | null => {
    if (!data.username) return "Username is required";
    if (typeof data.username !== "string") return "Username must be a string";
    if (!data.password) return "Password is required";
    if (typeof data.password !== "string") return "Password must be a string";
    if (!data.name) return "Name is required";
    if (typeof data.name !== "string") return "Name must be a string";
    if (data.role === undefined || data.role === null)
        return "Role is required";
    if (typeof data.role !== "number") return "Role must be a number";
    return null;
};

// Validation function for user login
const loginValidation = (data: LoginData): string | null => {
    if (!data.username) return "Username is required";
    if (typeof data.username !== "string") return "Username must be a string";
    if (!data.password) return "Password is required";
    if (typeof data.password !== "string") return "Password must be a string";
    return null;
};

// Validation function for product
const productValidation = (data: ProductData): string | null => {
    if (!data.name) return "Name is required";
    if (typeof data.name !== "string") return "Name must be a string";
    if (data.price === undefined || data.price === null)
        return "Price is required";
    if (typeof data.price !== "number") return "Price must be a number";
    return null;
};

// Validation function for role
const roleValidation = (data: RoleData): string | null => {
    if (!data.name) return "Name is required";
    if (typeof data.name !== "string") return "Name must be a string";
    return null;
};

// Validation function for location
const locationValidation = (data: LocationData): string | null => {
    if (!data.name) return "Name is required";
    if (typeof data.name !== "string") return "Name must be a string";
    if (!data.address) return "Address is required";
    if (typeof data.address !== "string") return "Address must be a string";
    if (data.capacity === undefined || data.capacity === null)
        return "Capacity is required";
    if (typeof data.capacity !== "number") return "Capacity must be a number";
    return null;
};

export {
    userValidation,
    loginValidation,
    productValidation,
    roleValidation,
    locationValidation,
    UserData,
    LoginData,
    ProductData,
    RoleData,
    LocationData,
};
