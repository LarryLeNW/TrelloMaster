import axios from "axios";
import { API_ROOT } from "src/util/constants";

export const fetchBoardDetail = async (boardId) => {
    const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    return res.data;
};

export const updateBoardDetail = async (boardId, data) => {
    const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, data);
    return res.data;
};

export const updateColumnDetail = async (columnId, updateData) => {
    const res = await axios.put(
        `${API_ROOT}/v1/columns/${columnId}`,
        updateData
    );
    return res.data;
};

export const deleteColumnDetail = async (columnId) => {
    const res = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
    return res.data;
};

export const createNewColumnAPI = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/columns`, data);
    return res.data;
};

export const createNewCardAPI = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/cards`, data);
    return res.data;
};

export const moveCardToDifferentAPI = async (data) => {
    console.log("put api move different card");
    const res = await axios.put(
        `${API_ROOT}/v1/boards/supports/moving_card`,
        data
    );
    return res.data;
};
