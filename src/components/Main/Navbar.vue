<template>
  <nav :class="['navbar', theme]" class="bg-[rgb(27,57,78)] shadow-lg shadow-grey-500/50 text-white p-4 flex justify-between items-center" :style="navbarStyle">
    <!-- Sidebar Toggle Button -->
    <button 
      @click="$emit('toggleSidebar')" 
      class="focus:outline-none lg:hidden" 
      aria-label="Toggle Sidebar">
      <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv mr-1 cursor-pointer" focusable="false"
        aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon" height="24" width="24">
        <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
      </svg>
    </button>

 
    <!-- Toggle Sidebar Position Button -->
    <button @click="togglePosition" class="toggle-sidebar-position-btn hidden sm:block text-sm px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
      Toggle Sidebar Position
    </button>

    <!-- Language Selector -->
    <select v-model="selectedLanguage" @change="changeLanguage" class="p-2 bg-gray-700 text-white rounded text-sm">
      <option value="en">English</option>
      <option value="bn">বাংলা</option>
      <option value="fr">Français</option>
      <option value="sv">Svenska</option>
    </select>
   <!-- Color Picker -->
   <div class="color-picker hidden sm:flex space-x-2">
      <button @click="setTheme('light')" class="theme-btn light text-sm">{{ $t('navbar.light') }}</button>
      <button @click="setTheme('blue')" class="theme-btn blue text-sm">{{ $t('navbar.Blue') }}</button>
      <button @click="setTheme('gray')" class="theme-btn gray text-sm">{{ $t('navbar.Gray') }}</button>
    </div>

    <!-- Logout Button -->
    <button @click="showModal = true" aria-label="Logout" class="logout-button flex items-center text-gray-800 text-2xl hover:text-yellow-400">
      <img src="@/assets/img/logout.webp" alt="Logout Icon" class="mr-1 w-8 h-8" />
    </button>
    <LogoutModal v-if="showModal" :isVisible="showModal" @close="showModal = false" @logout="logout" />
  </nav>
</template>

<script>
import LogoutModal from "@/components/Modals/LogoutModal.vue";

export default {
  props: ['theme'],
  theme: String,

  name: 'Navbar',
  components: {
    LogoutModal,
  },
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      showModal: false,  // Controls modal visibility
      isSidebarOpen: true,  // You can bind this value to the parent or use it based on your store/state
      sidebarPosition: 'left',  // You can adjust this dynamically as well
    };
  },
  computed: {
computed: {
  navbarStyle() {
    return {
      marginLeft: this.isSidebarOpen && this.sidebarPosition === 'left' ? '280px' : '0px',
      marginRight: this.isSidebarOpen && this.sidebarPosition === 'right' ? '280px' : '0px',
    };
  },
},

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

<style scoped>
/* Button Styles for the color theme buttons */
.theme-btn {
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.theme-btn:hover {
  transform: scale(1.1);
}

.theme-btn.light {
  background-color: #ff66b2;
  color: white;
}

.theme-btn.light:hover {
  background-color: #ff3385;
}

.theme-btn.blue {
  background-color: #1e90ff;
  color: white;
}

.theme-btn.blue:hover {
  background-color: #1c74d0;
}

.theme-btn.gray {
  background-color: #4b4b4b;
  color: white;
}

.theme-btn.gray:hover {
  background-color: #333333;
}

/* Navbar Custom Styles */
.navbar {
  height: 70px;
  background-color: var(--navbar-bg);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

/* Navbar Themes */
.navbar.light {
  background-color: #f3eef1;
}

.navbar.blue {
  background-color: #1e90ff;
}

.navbar.gray {
  background-color: #4b4b4b;
}

/* Logout Button Styles */
.logout-button {
  display: flex;
  align-items: center;
}

/* Media Queries for Mobile & Tablet Responsiveness */
@media (max-width: 640px) {
  .navbar {
    padding: 10px;  /* Adjust padding on mobile */
  }

  .color-picker {
    display: none;  /* Hide color picker on mobile */
  }

  .toggle-sidebar-position-btn {
    display: none;  /* Hide toggle button on small screens */
  }

  /* Mobile logout button adjustment */
  .logout-button {
    font-size: 1.5rem;
  }
}

@media (min-width: 640px) {
  .navbar {
    padding: 10px 20px; /* Adjust padding on larger screens */
  }
}
</style>
