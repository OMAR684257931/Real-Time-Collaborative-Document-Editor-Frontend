import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true,
});

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.Authorization;
    }
};

const token = localStorage.getItem("token");
if (token) setAuthToken(token);

export default api;
