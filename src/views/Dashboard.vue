<template>

  <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg bg-opacity-30 ">
      <h1 class="text-3xl font-semibold mb-6">Welcome to your Dashboard</h1>
      <p class="text-lg mb-10">Here you can view various statistics, reports, and other information related to your account.</p>
      
      <div class="flex justify-between gap-6">
        <div class="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 class="text-xl font-bold">{{ $t('dashboard') }}</h2>
          <p class="text-2xl font-semibold">1,245</p>
        </div>
        <div class="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Total Sales</h3>
          <p class="text-2xl font-semibold">$5,230</p>
        </div>
        <div class="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Pending Orders</h3>
          <p class="text-2xl font-semibold">36</p>
        </div>
     <!-- Toggle Sidebar Position Button -->
     <button @click="togglePosition" class="toggle-sidebar-position-btn hidden sm:block text-sm px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
      Toggle Sidebar Position
    </button>

      </div>
  </div>
</template>

<script>
import LogoutModal from "@/components/Modals/LogoutModal.vue";

export default {
  props: ['theme'],
  theme: String,

  name: 'Dashboard',
  components: {
    LogoutModal,
  },
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      showModal: false,  // Controls modal visibility
    };
  },
  methods: {
    togglePosition() {
      this.$emit('toggle-sidebar-position'); // Emit event to parent to toggle position
    },
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
    setTheme(color) {
      this.$emit('change-theme', color); // Emit event to update theme in App.vue
    },
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>
