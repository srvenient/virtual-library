import axios from "../api/axios.ts";

export const registerRequest = async (student: Record<string, any>) => {
    const response = await axios.post('/register', student);
    return response.data;
};

export const loginRequest = async (student: Record<string, any>) => {
    const response = await axios.post('/login', student);
    return response.data;
};

export const verifyTokenRequest = async () => {
    try {
        const response = await axios.get('/auth/verify-token');
        return response.data;
    } catch (error: any) {
        console.error(error);
    }
};
