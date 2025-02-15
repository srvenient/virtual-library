import axios from "./axios.ts";


export const registerRequest = async (student: Record<string, any>) => {
    try {
        const response = await axios.post(`/register`, student);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.detail || 'Error desconocido');
        }
        throw new Error('Error de conexión con el servidor');
    }
};

export const loginRequest = async (student: Record<string, any>) => {
    try {
        const response = await axios.post(`/login`, student);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.detail || 'Error desconocido');
        }
        throw new Error('Error de conexión con el servidor');
    }
}

export const verifyTokenRequest = async (token: string) => {
    return await axios.get(`/auth/verify-token`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

