<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 🔹 Header Section -->
    <header class="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 class="text-2xl font-semibold tracking-wide flex items-center">
        📄 <span class="ml-2">Real-Time Document Editor</span>
      </h1>
      <button @click="logout" class="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white shadow-md transition-all">
        Logout
      </button>
    </header>

    <!-- 🔹 Main Content Section -->
    <div class="flex flex-grow">
      <!-- Sidebar - Active Collaborators -->
      <aside class="w-1/4 bg-white p-6 border-r shadow-lg">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <span class="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Active Collaborators
        </h3>
        <ul class="space-y-2">
          <li
              v-for="user in document.collaborators"
              :key="user"
              class="p-3 bg-gray-100 text-gray-700 rounded-md shadow flex items-center space-x-2 hover:bg-gray-200 transition-all"
          >
            <span class="text-gray-800 font-medium">👤 {{ user }}</span>
          </li>
        </ul>
        <button @click="leaveDocument" class="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg shadow-md transition-all">
          Leave Document
        </button>
      </aside>

      <!-- 🔹 Editor Area -->
      <div class="w-3/4 p-8 relative bg-white shadow-lg rounded-lg mx-6">
        <!-- Floating Toolbar -->
        <div class="absolute top-5 right-5 flex space-x-3">
          <button @click="saveDocument" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all">
            💾 Save
          </button>
          <button @click="leaveDocument" class="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md transition-all">
            🔙 Leave
          </button>
        </div>

        <!-- Document Title Input -->
        <input
            v-model="document.title"
            @input="debouncedUpdateTitle"
            placeholder="Document Title"
            class="w-full text-3xl font-bold border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
        />

        <!-- Document Content Editor -->
        <textarea
            v-model="document.content"
            @input="debouncedUpdateContent"
            class="w-full h-[500px] p-5 mt-6 bg-gray-100 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Start typing your document..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDocumentStore } from "../store/documentStore";
import { useAuthStore } from "../store/authStore";
import { useDebounceFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const documentStore = useDocumentStore();
const authStore = useAuthStore();

const document = computed(() => documentStore.document);

// ✅ Debounce updates
const debouncedUpdateTitle = useDebounceFn(() => {
  if (document.value.id && document.value.title.trim() !== "") {
    documentStore.updateDocument({ title: document.value.title });
  }
}, 500);

const debouncedUpdateContent = useDebounceFn(() => {
  if (document.value.id && document.value.content.trim() !== "") {
    documentStore.updateDocument({ content: document.value.content });
  }
}, 500);

// ✅ Save document manually
const saveDocument = () => {
  if (document.value.id) {
    documentStore.updateDocument({ title: document.value.title, content: document.value.content });
    alert("✅ Document saved!");
  }
};

// ✅ Remove collaborator when user leaves the document
const leaveDocument = async () => {
  await documentStore.removeCollaborator();
  router.push("/documents");
};

// ✅ Logout function
const logout = async () => {
  await authStore.logout();
  router.push("/");
};

onMounted(async () => {
  await documentStore.fetchDocument(route.params.id);
  documentStore.listenForUpdates(route.params.id);
});

// ✅ Cleanup when leaving the document
onUnmounted(() => {
  documentStore.removeCollaborator();
});
</script>

<style scoped>
textarea {
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
