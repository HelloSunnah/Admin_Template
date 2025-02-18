<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-gray-100">
    <!-- Left Section (GIF) -->
    <div class="flex-1 flex items-center justify-center p-4 lg:p-8">
      <img
        src="@/assets/img/loginPage2.gif"
        alt="Loading..."
        class="w-full h-64 lg:h-full object-cover object-center rounded-lg shadow-xl"
      />
    </div>

    <!-- Right Section (Form) -->
    <div
      class="flex-1 flex items-center justify-center bg-gradient-to-tr from-gray-50 to-gray-200 p-4 lg:p-8 rounded-none lg:rounded-r-3xl"
    >
      <div class="relative w-full max-w-sm p-8 sm:p-10 bg-white rounded-xl lg:rounded-2xl shadow-2xl">
        <!-- Logo -->
        <img
          src="@/assets/img/ati-small-logo.png"
          class="h-10 sm:h-12 w-auto mx-auto mb-6 animate__animated animate__fadeIn"
          alt="Logo"
        />

        <!-- Form -->
        <form @submit.prevent="loginUser">
          <!-- Username Field -->
          <div class="mb-6">
            <input
              v-model="form.userName"
              type="text"
              placeholder="User Name"
              class="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition duration-200 ease-in-out shadow-sm"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="mb-6">
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition duration-200 ease-in-out shadow-sm"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full p-3 sm:p-4 bg-gray-800 text-white rounded-md text-base sm:text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 ease-in-out"
          >
            <span v-if="loading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <!-- Optional Link or Text -->
        <p class="mt-6 text-center text-gray-600 text-sm"></p>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/js/Login";
export default {
  name: "Login",
  ...Login,
};
</script>
<style scoped>
/* Disable Scrolling */
html,
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Ensure Flex Container Takes Full Height */
.flex {
  height: auto;
  min-height: 100vh;
  width: 100%;
}

/* Responsive Adjustments */
img {
  max-height: 100%;
  width: auto;
  object-fit: cover;
}

/* Form Enhancements */
.bg-white {
  background: linear-gradient(to top right, #ffffff, #f9f9f9);
}
.shadow-2xl {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.1);
}

/* Input Focus Effects */
input:focus {
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
}
button:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
}

/* Button Disabled State */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
