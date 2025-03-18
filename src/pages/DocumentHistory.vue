<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Document History</h2>

      <ul class="space-y-4">
        <li
            v-for="version in history"
            :key="version.id"
            class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <p class="text-gray-700">{{ new Date(version.created_at).toLocaleString() }}</p>
          <button
              @click="restoreVersion(version)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-all"
          >
            Restore
          </button>
        </li>
      </ul>

      <div class="mt-6">
        <button
            @click="goBack"
            class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter} from "vue-router";
import api from "../api";

const route = useRoute();
const router = useRouter();
const history = ref([]);

const fetchHistory = async () => {
  const {data} = await api.get(`/documents/${route.params.id}/history`);
  history.value = data;
};

const restoreVersion = async (version) => {
  await api.put(`/documents/${route.params.id}`, {content: version.content});
  router.push(`/document/${route.params.id}`);
};

const goBack = () => {
  router.push(`/document/${route.params.id}`);
};

onMounted(fetchHistory);
</script>

<style scoped>
/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}
</style>