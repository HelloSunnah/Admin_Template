<template>
  <div class="flex h-screen">
    <!-- Sidebar on left or right based on sidebarPosition -->
    <Sidebar v-if="!isAuthPage" :isOpen="isSidebarOpen" :theme="theme" :position="sidebarPosition" />

    <div class="flex-1 flex flex-col">
      <!-- Pass the toggle event from Navbar -->
      <Navbar :theme="theme" @change-theme="updateTheme" v-if="!isAuthPage" @toggleSidebar="toggleSidebar" @toggle-sidebar-position="toggleSidebarPosition" />

      <main :class="['content', dashboardBackground, { 'ml-56': isSidebarOpen && sidebarPosition === 'left', 'mr-56': isSidebarOpen && sidebarPosition === 'right', 'ml-0': !isSidebarOpen }]"
        class="flex-1 overflow-y-auto p-4 transition-all duration-300">
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
      theme: localStorage.getItem('theme') || 'pink', // Default theme for sidebar and navbar
      dashboardBackground: localStorage.getItem('dashboardBackground') || 'yellow', // Default color for the dashboard
      isSidebarOpen: true,
      sidebarPosition: localStorage.getItem('sidebarPosition') || 'left', // Sidebar position (left or right)
    };
  },
  computed: {
    isAuthPage() {
      // Check if the current route is login or registration
      return this.$route.name === 'Login' || this.$route.name === 'Registration';
    },
  },
  methods: {
    updateTheme(color) {
      this.theme = color; // Update the theme for sidebar and navbar
      localStorage.setItem('theme', color); // Store it in localStorage
      this.updateDashboardColor(color); // Change the dashboard background color based on the selected theme
    },
    updateDashboardColor(color) {
      // Change the dashboard background color based on the selected theme
      if (color === 'pink') {
        this.dashboardBackground = 'yellow'; // Pink theme → Yellow dashboard
      } else if (color === 'blue') {
        this.dashboardBackground = 'lightblue'; // Blue theme → Light blue dashboard
      } else if (color === 'gray') {
        this.dashboardBackground = 'lightgray'; // Gray theme → Light gray dashboard
      }
      localStorage.setItem('dashboardBackground', this.dashboardBackground); // Save dashboard color to localStorage
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
    },
    toggleSidebarPosition() {
      // Toggle between left and right sidebar positions
      this.sidebarPosition = this.sidebarPosition === 'left' ? 'right' : 'left';
      localStorage.setItem('sidebarPosition', this.sidebarPosition); // Store the sidebar position in localStorage
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

/* Sidebar Open - Content Shift */
.ml-56 {
  margin-left: 224px; /* Adjust this to match sidebar width */
}

/* Sidebar Open - Content Shift (Right Sidebar) */
.mr-56 {
  margin-right: 224px; /* Adjust this to match sidebar width */
}

/* Sidebar Closed - Full Width */
.ml-0 {
  margin-left: 0;
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
</style>
