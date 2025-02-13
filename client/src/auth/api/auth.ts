import axios from 'axios';

const API_URL = 'http://localhost:5174/api/auth/';

export const registerRequest =
    (student: string) => axios.post(`${API_URL}register`, student)