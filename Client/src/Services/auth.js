import axios from "axios";
import { API_ROOT } from "src/util/constants";

export const login = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/auth/login`, data);
    return res.data;
};

export const register = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/auth/register`, data);
    return res.data;
};

export const getInfo = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/auth/getInfo`, data);
    return res.data;
};
