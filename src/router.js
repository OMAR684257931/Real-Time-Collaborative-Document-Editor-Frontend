import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import DocumentList from "./pages/DocumentList.vue";
import DocumentEditor from "./pages/DocumentEditor.vue";
import DocumentHistory from "./pages/DocumentHistory.vue";

const routes = [
    { path: "/", component: Login },
    { path: "/register", component: Register },
    { path: "/documents", component: DocumentList },
    { path: "/document/:id", component: DocumentEditor },
    { path: "/document/:id/history", component: DocumentHistory },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
