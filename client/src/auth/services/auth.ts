import axios from "../../shared/api/axios.ts";

export const registerRequest = async (student: Record<string, any>) => {
    const response = await axios.post('/register', student);
    return response.data;
};

export const loginRequest = async (student: Record<string, any>) => {
    const response = await axios.post('/login', student);
    return response.data;
};

export const verifyTokenRequest = async () => {
    return await axios.get('/auth/verify-token');
};
