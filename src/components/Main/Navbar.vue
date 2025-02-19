<template>
  <nav :class="['navbar', theme]" class="bg-[rgb(27,57,78)] shadow-lg shadow-grey-500/50 text-white p-4 flex justify-between">
    <button @click="$emit('toggleSidebar')" class="focus:outline-none" aria-label="Toggle Sidebar">
      <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv mr-1 cursor-pointer" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon" height="24" width="24">
        <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
      </svg>
    </button>
    <div class="color-picker">
      <button @click="setTheme('pink')" class="theme-btn pink">Pink</button>
      <button @click="setTheme('blue')" class="theme-btn blue">Blue</button>
      <button @click="setTheme('gray')" class="theme-btn gray">Gray</button>
    </div>
    <button class="logout-button flex items-center text-gray-800 text-2xl hover:text-yellow-400" @click="showModal = true" aria-label="Logout">
      <img src="@/assets/img/logout.webp" alt="Logout Icon" class="mr-1 w-8 h-8" />
    </button>
    <LogoutModal v-if="showModal" :isVisible="showModal" @close="showModal = false" @logout="logout" />
  </nav>
</template>

  
  <script>
  import LogoutModal from "@/components/Modals/LogoutModal.vue";
  
  export default {
    props: ['theme'],

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
.navbar {
  height: 70px;
  background-color: var(--navbar-bg);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.navbar.pink {
  background-color: #ff66b2; /* Soft pink for better appearance */
}

.navbar.blue {
  background-color: #1e90ff; /* Bright blue */
}

.navbar.gray {
  background-color: #4b4b4b; /* Dark gray for a subtle look */
}

.logo h1 {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.color-picker {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.theme-btn {
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.theme-btn:hover {
  transform: scale(1.1); /* Slightly enlarge the button on hover */
}

.theme-btn.pink {
  background-color: #ff66b2;
  color: white;
}

.theme-btn.pink:hover {
  background-color: #ff3385; /* Darker pink on hover */
}

.theme-btn.blue {
  background-color: #1e90ff;
  color: white;
}

.theme-btn.blue:hover {
  background-color: #1c74d0; /* Darker blue on hover */
}

.theme-btn.gray {
  background-color: #4b4b4b;
  color: white;
}

.theme-btn.gray:hover {
  background-color: #333333; /* Darker gray on hover */
}
</style>
