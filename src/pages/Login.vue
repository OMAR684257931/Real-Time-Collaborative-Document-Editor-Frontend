<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-200">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Sign in</h2>
      <p class="text-gray-600 text-center mb-6">Stay updated on your professional world</p>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email or Phone"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
          />
        </div>

        <div>
          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
          />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Sign in
        </button>

        <div class="text-center">
          <router-link to="/forgot-password" class="text-blue-600 hover:underline">Forgot password?</router-link>
        </div>
      </form>

      <div class="flex items-center justify-center my-6">
        <hr class="w-full border-gray-300" />
        <span class="mx-4 text-gray-500">or</span>
        <hr class="w-full border-gray-300" />
      </div>

      <div class="text-center">
        <p class="text-gray-600">New to LinkedIn? <router-link to="/register" class="text-blue-600 hover:underline">Join now</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api, { setAuthToken } from "../api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const { data } = await api.post("/login", { email: email.value, password: password.value });
    setAuthToken(data.token);
    router.push("/documents");
  } catch (error) {
    alert("Login failed. Please check your credentials.");
  }
};
</script>

<style scoped>
/* Input focus effects */
input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Button hover effects */
button:hover {
  background-color: #2563eb;
}

/* Link hover effects */
a:hover {
  text-decoration: underline;
}
</style>