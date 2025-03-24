import axios from "axios";
import { config } from "../config";

export const getProducts = async (payload) => {
    let params = {};

    if (payload.limit) {
        params = {
            limit: payload.limit
        }
    }
    if (payload.skip) {
        params = {
            ...params,
            skip: payload.skip
        }
    }
    if (payload.search) {
        params = {
            ...params,
            search: payload.search
        }
    }

    try {
        const response = await axios.get(`${config.DUMMY_PRODUCTS_API_BASE_URL}`, { params });
        return response?.data ?? {};
    } catch (error) {
        console.log(error);
        return {};
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${config.DUMMY_PRODUCTS_API_BASE_URL}/${id}`);
        return response?.data ?? {};
    } catch (error) {
        console.log(error);
        return {};
    }
};


export const addProduct = async (product) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: Math.random(), ...product }), 500);
    });
};
