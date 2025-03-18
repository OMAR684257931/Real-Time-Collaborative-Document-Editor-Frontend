<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Your Documents</h2>
      <button
          @click="createDocument"
          class="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        + Create New Document
      </button>

      <ul class="space-y-4">
        <li
            v-for="doc in documents"
            :key="doc.id"
            class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <router-link
              :to="`/document/${doc.id}`"
              class="text-blue-600 hover:underline"
          >
            {{ doc.title }}
          </router-link>
          <button
              @click="viewHistory(doc.id)"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-lg transition-all"
          >
            View History
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import api from "../api";
import {useRouter} from "vue-router";

const documents = ref([]);
const router = useRouter();

const fetchDocuments = async () => {
  const {data} = await api.get("/documents");
  documents.value = data;
};

const createDocument = async () => {
  const {data} = await api.post("/documents", {title: "New Document", content: ""});
  router.push(`/document/${data.id}`);
};

const viewHistory = (id) => {
  router.push(`/document/${id}/history`);
};

onMounted(fetchDocuments);
</script>

<style scoped>
/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Link hover effects */
a:hover {
  text-decoration: underline;
}
</style>