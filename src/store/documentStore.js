import { defineStore } from "pinia";
import api from "../api";
import echo from "../echo";

export const useDocumentStore = defineStore("document", {
    state: () => ({
        document: { id: null, title: "Loading...", content: "", collaborators: [] },
    }),

    actions: {
        async fetchCollaborators() {
            if (!this.document || !this.document.id) return;

            try {
                const response = await api.get(`/documents/${this.document.id}/active`);
                this.document.collaborators = response.data;
            } catch (error) {
                console.error("Failed to fetch collaborators:", error);
            }
        },

        async fetchDocument(docId) {
            try {
                const response = await api.get(`/documents/${docId}`);
                this.document = response.data || { id: docId, title: "Untitled", content: "", collaborators: [] };

                // ✅ Add user as collaborator when they open the document
                await api.post(`/documents/${this.document.id}/collaborators`);
                await this.fetchCollaborators(); // ✅ Fetch updated list
            } catch (error) {
                console.error("Failed to fetch document:", error);
                this.document = { id: docId, title: "Error", content: "", collaborators: [] };
            }
        },

        async removeCollaborator() {
            if (!this.document || !this.document.id) return;

            try {
                await api.delete(`/documents/${this.document.id}/collaborators`);
                await this.fetchCollaborators(); // ✅ Refresh collaborators list
            } catch (error) {
                console.error("Failed to remove collaborator:", error);
            }
        },

        async updateDocument(updates) {
            if (!this.document || !this.document.id) {
                console.warn("Document ID is missing! Cannot update.");
                return;
            }

            try {
                const response = await api.put(`/documents/${this.document.id}`, updates);
                this.document.title = response.data.title;
                this.document.content = response.data.content;
                this.document.collaborators = response.data.collaborators;
            } catch (error) {
                console.error("Failed to update document:", error);
            }
        },

        listenForUpdates(docId) {
            echo.private(`document.${docId}`)
                .listen("DocumentUpdated", (event) => {
                    if (this.document.id === event.id) {
                        this.document.title = event.title;
                        this.document.content = event.content;
                    }
                });
        },
    },
});
