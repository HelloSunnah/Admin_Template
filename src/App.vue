<template>
  <div id="app">
    <!-- Sidebar and Navbar share the same theme -->
    <Sidebar :theme="theme" />
    <Navbar :theme="theme" @change-theme="updateTheme" />
    
    <!-- The content area where dashboard will appear -->
    <div :class="['content', dashboardBackground]">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Main/Sidebar.vue';
import Navbar from './components/Main/Navbar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'pink', // Default theme for sidebar and navbar
      dashboardBackground: localStorage.getItem('dashboardBackground') || 'yellow' // Default color for the dashboard
    };
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
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 200px;
  padding: 20px;
}

/* Different dashboard background colors for each theme */
.content.yellow {
  background-color: yellow; /* Yellow for pink theme */
}
.content.lightblue {
  background-color: lightblue; /* Light blue for blue theme */
}
.content.lightgray {
  background-color: lightgray; /* Light gray for gray theme */
}
</style>
