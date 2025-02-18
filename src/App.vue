<template>
  <div class="flex h-screen">
    <Sidebar v-if="!isAuthPage" :isOpen="isSidebarOpen" />
    <div class="flex-1 flex flex-col">
      <Navbar v-if="!isAuthPage" @toggleSidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>
      <Footer v-if="!isAuthPage" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Main/Navbar.vue';
import Sidebar from './components/Main/Sidebar.vue';
import Footer from './components/Main/Footer.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  data() {
    return {
      isSidebarOpen: true, // Default state for the sidebar
    };
  },
  computed: {
    isAuthPage() {
      // Check if the current route is login or registration
      return this.$route.name === 'Login' || this.$route.name === 'Registration';
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
    },
  },
};
</script>

<style>
/* Add any global styles here */
</style>
