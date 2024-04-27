import axios from "axios";
import { API_ROOT } from "src/util/constants";

export const createBoard = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/boards`, data);
    return res.data;
};
