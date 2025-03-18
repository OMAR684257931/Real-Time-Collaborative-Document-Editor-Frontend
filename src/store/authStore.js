import { defineStore } from "pinia";
import api from "../api"; // Ensure this is your Axios instance

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null, // ✅ Store token
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await api.post("/login", credentials);
                this.token = response.data.token;
                localStorage.setItem("token", this.token);
                api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
            } catch (error) {
                console.error("Login failed:", error);
                throw error;
            }
        },

        async register(credentials) {
            try {
                const response = await api.post("/register", credentials);
                this.token = response.data.token;
                localStorage.setItem("token", this.token);
                api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
            } catch (error) {
                console.error("Registration failed:", error);
                throw error;
            }
        },

        async logout() {
            try {
                await api.post("/logout");
            } catch (error) {
                console.error("Logout failed:", error);
            }
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
        },

        async fetchUser() {
            if (!this.token) return;

            try {
                const response = await api.get("/user");
                this.user = response.data;
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        },
    },
});
