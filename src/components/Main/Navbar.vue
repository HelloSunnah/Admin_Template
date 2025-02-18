<template>
  <nav class="bg-[rgb(27,57,78)] shadow-lg shadow-grey-500/50 text-white p-4 flex justify-between">
    <button
      @click="$emit('toggleSidebar')"
      class="focus:outline-none"
      aria-label="Toggle Sidebar"
    >
      <svg
        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv mr-1 cursor-pointer"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="MenuIcon"
        height="24"
        width="24"
      >
        <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
      </svg>
    </button>

    <button
      class="logout-button flex items-center text-gray-800 text-2xl hover:text-yellow-400"
      @click="showModal = true"
      aria-label="Logout"
    >
      <img src="@/assets/img/logout.webp" alt="Logout Icon" class="mr-1 w-8 h-8" />
    </button>

    <!-- Modal for logout confirmation -->
    <LogoutModal
      v-if="showModal"
      :isVisible="showModal"
      @close="showModal = false"
      @logout="logout"
    />
  </nav>
</template>

<script>
import LogoutModal from "@/components/Modals/LogoutModal.vue";

export default {
  name: 'Navbar',
  components: {
    LogoutModal,
  },
  data() {
    return {
      showModal: false,  // Controls modal visibility
    };
  },
  methods: {
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
