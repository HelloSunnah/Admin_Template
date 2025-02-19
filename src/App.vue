<template>
  <div class="flex h-screen">
    <!-- Sidebar: Positioned Left or Right based on sidebarPosition -->
    <Sidebar v-if="!isAuthPage" :isOpen="isSidebarOpen" :theme="theme" :position="sidebarPosition" />

    <div class="flex-1 flex flex-col">
      <!-- Navbar with theme and sidebar toggle buttons -->
      <Navbar 
        :theme="theme" 
        @change-theme="updateTheme" 
        v-if="!isAuthPage" 
        @toggleSidebar="toggleSidebar"
        @toggle-sidebar-position="toggleSidebarPosition" 
      />

      <!-- Main Content Area -->
      <main
        :class="[
          'content', 
          dashboardBackground, 
          sidebarClasses, 
          'flex-1', 
          'overflow-y-auto', 
          'p-4', 
          'transition-all', 
          'duration-300',
          'mt-navbar',
          'sm:ml-0',    
          'sm:mr-0'     
        ]"
      >
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
      theme: this.getLocalStorage('theme', 'light'), // Default theme for sidebar and navbar
      dashboardBackground: this.getLocalStorage('dashboardBackground', 'yellow'), // Default color for the dashboard
      isSidebarOpen: true,
      sidebarPosition: this.getLocalStorage('sidebarPosition', 'left'), // Sidebar position (left or right)
    };
  },
  computed: {
    isAuthPage() {
      // Check if the current route is login or registration
      return ['Login', 'Registration'].includes(this.$route.name);
    },
    sidebarClasses() {
      return {
        'ml-56': this.isSidebarOpen && this.sidebarPosition === 'left', // Apply left margin if sidebar is left
        'mr-56': this.isSidebarOpen && this.sidebarPosition === 'right', // Apply right margin if sidebar is right
        'ml-0': !this.isSidebarOpen, // No margin if sidebar is closed
        'mr-0': !this.isSidebarOpen, // No margin if sidebar is closed
      };
    },
  },
  methods: {
    getLocalStorage(key, defaultValue) {
      return localStorage.getItem(key) || defaultValue;
    },
    setLocalStorage(key, value) {
      localStorage.setItem(key, value);
    },
    updateTheme(color) {
      this.theme = color;
      this.setLocalStorage('theme', color); // Store the theme in localStorage
      this.updateDashboardColor(color); // Change the dashboard background color based on the selected theme
    },
    updateDashboardColor(color) {
      const backgroundColors = {
        light: 'yellow',
        blue: 'lightblue',
        gray: 'lightgray',
      };
      this.dashboardBackground = backgroundColors[color] || 'yellow';
      this.setLocalStorage('dashboardBackground', this.dashboardBackground); // Save dashboard color to localStorage
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleSidebarPosition() {
      this.sidebarPosition = this.sidebarPosition === 'left' ? 'right' : 'left';
      this.setLocalStorage('sidebarPosition', this.sidebarPosition); // Store the sidebar position in localStorage
    },
  },
};
</script>

<style scoped>
/* Default Content Styling */
.content {
  padding: 20px;
  transition: margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out;
}

/* Adjust navbar margin to prevent overlap */

/* Sidebar Open - Content Shift (Left Sidebar) */
.ml-56 {
  margin-left: 280px; /* Adjust this to match sidebar width */
}

/* Sidebar Open - Content Shift (Right Sidebar) */
.mr-56 {
  margin-right: 224px; /* Adjust this to match sidebar width */
}

/* Sidebar Closed - Full Width */
.ml-0 {
  margin-left: 0;
}

.mr-0 {
  margin-right: 0;
}

/* Different dashboard background colors for each theme */
.content.yellow {
  background-color: rgb(177, 177, 170);
}

.content.lightblue {
  background-color: lightblue;
}

.content.lightgray {
  background-color: lightgray;
}

/* Tailwind Responsiveness */
@media (max-width: 640px) {
  .ml-56, .mr-56 {
    margin-left: 0;  /* No margin when on small screens */
    margin-right: 0;
  }
}
</style>
