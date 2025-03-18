<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-200">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
      <p class="text-gray-600 text-center mb-6">Join us to get started</p>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <input
              v-model="name"
              type="text"
              placeholder="Full Name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
          />
        </div>

        <div>
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
          />
        </div>

        <div>
          <input
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
          Register
        </button>
      </form>

      <div class="text-center mt-6">
        <p class="text-gray-600">Already have an account? <router-link to="/" class="text-blue-600 hover:underline">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api, { setAuthToken } from "../api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    const {data} = await api.post("/register", {name: name.value, email: email.value, password: password.value});
    setAuthToken(data.token);
    router.push("/document/1");
  } catch (error) {
    alert("Registration failed");
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