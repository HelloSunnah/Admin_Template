<template>
  <div :class="['sidebar', theme]">
    <!-- Sidebar Header -->
    <div class="flex items-center justify-center p-4">
      <button @click="toggleSidebar" class="text-white focus:outline-none">
        <img src="@/assets/img/ati-logo.png" alt="Admin Panel" class="h-18 w-full" />
      </button>

    </div>

    <!-- Sidebar Menu -->
  
    <nav class="flex flex-col space-y-4 px-1 pt-12 flex-grow">
      <div v-for="item in menuItems" :key="item.id" class="flex flex-col relative">
        <!-- Menu Button -->
        <button @click="handleItemClick(item)" 
                class="flex items-center w-full text-gray-300 hover:text-white hover:bg-blue-500 rounded-lg transition-all transform hover:scale-105"
                :class="currentRoute === item.route ? 'text-blue-800 bg-blue-200' : 'text-gray-800 bg-gray-100'">

          <div class="w-12 h-10 flex items-center justify-center rounded-r-full transition-all"
               :class="currentRoute === item.route ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'">
            <!-- Font Awesome Icon -->
            <i :class="item.icon" class="w-6 h-6"></i>
          </div>

          <!-- Text Section (only visible when sidebar is open) -->
          <span v-if="isOpen" class="ml-4 text-base font-medium">{{ item.label }}</span>
        </button>

        <!-- Submenu Section (only visible when the sidebar is open and menu item has a submenu) -->
        <div v-if="item.subItems && dropdownOpen[item.id]" 
             :class="{
               'absolute left-full top-0 mt-2 w-max bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-md border border-gray-300 transition-all duration-300 ease-in-out z-10': !isOpen,
               'ml-6 mt-2 flex flex-col space-y-2 w-full bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-md border border-gray-300 transition-all duration-300 ease-in-out z-10': isOpen
             }">
          <div v-for="sub in item.subItems" :key="sub.id" class="relative">
            <button @click="handleSubItemClick(sub)" class="p-3 text-gray-800 hover:bg-blue-600 hover:text-white transition-all rounded-md w-full flex items-center space-x-2">
              <!-- Font Awesome Icon -->
              <i v-if="sub.icon" :class="sub.icon" class="w-5 h-5 text-gray-600"></i>
              <span>{{ sub.label }}</span>
            </button>
            <!-- Divider between submenu items -->
            <div v-if="item.subItems.length > 1" class="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: ['theme'], // Accept the theme prop from App.vue
  data() {
    return {
      dropdownOpen: reactive({}),
      menuItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'fas fa-tachometer-alt',
          route: '/dashboard',
        },
        {
          id: 'report',
          label: 'Report',
          icon: 'fas fa-file-alt',
          subItems: [
            { id: 'due-report', label: 'Due Report', route: '/dashboard', icon: 'fas fa-calendar-day' },
            { id: 'paid-report', label: 'Paid Report', route: '/dashboard', icon: 'fas fa-calendar-check' },
          ],
        },
      ],
      isOpen: true, // You can toggle this depending on your UI logic for opening/closing the sidebar
    };
  },
  created() {
    // Initialize dropdownOpen for each menu item
    this.menuItems.forEach(item => {
      this.dropdownOpen[item.id] = false;
    });
  },
  computed: {
    currentRoute() {
      return useRoute().path; // Dynamically track the current route
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle'); // Emit an event to parent component for sidebar toggle
    },
    toggleDropdown(itemId) {
      this.dropdownOpen[itemId] = !this.dropdownOpen[itemId]; // Toggle dropdown visibility
    },
    handleItemClick(item) {
      if (item.subItems && item.subItems.length) {
        this.toggleDropdown(item.id); // Open/close dropdown if the item has sub-items
      } else {
        this.$router.push(item.route); // Navigate to the route if no sub-items
      }
    },
    handleSubItemClick(subItem) {
      this.$router.push(subItem.route); // Navigate to the sub-item's route
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color 0.3s;
  background-color: var(--sidebar-bg-color, #1a202c);
  color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
}

.sidebar-header {
  background-color: #2d3748;
  border-bottom: 1px solid #4a5568;
}

.sidebar-header h2 {
  margin: 0;
  color: #fff;
}

.sidebar .text-white {
  color: #fff;
}

.sidebar .bg-blue-500 {
  background-color: #4299e1;
}

.sidebar .text-gray-300 {
  color: #e2e8f0;
}

.sidebar .text-blue-800 {
  color: #2b6cb0;
}

.sidebar .bg-blue-200 {
  background-color: #ebf8ff;
}

.sidebar .bg-gray-100 {
  background-color: #f7fafc;
}

.sidebar .w-12 {
  width: 3rem;
}

.sidebar .h-12 {
  height: 3rem;
}

.sidebar .rounded-full {
  border-radius: 9999px;
}

.sidebar .hover\:scale-105:hover {
  transform: scale(1.05);
}

.sidebar .transition-all {
  transition: all 0.3s ease-in-out;
}

.sidebar .ml-4 {
  margin-left: 1rem;
}

.sidebar .ml-6 {
  margin-left: 1.5rem;
}

.sidebar .py-2 {
  padding: 0.5rem;
}

.sidebar .p-2 {
  padding: 0.5rem;
}

.sidebar .font-medium {
  font-weight: 500;
}

.sidebar .font-semibold {
  font-weight: 600;
}

/* Sidebar theme color classes */
.sidebar.pink {
  background-color: pink;
}

.sidebar.blue {
  background-color: blue;
}

.sidebar.gray {
  background-color: gray;
}

/* Dropdown submenu */
.sidebar .space-y-2 {
  margin-top: 1rem;
}

.sidebar .space-y-2 button {
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}

.sidebar .space-y-2 button:hover {
  background-color: #2b6cb0;
  color: white;
}

.sidebar .text-base {
  font-size: 1rem;
}

.sidebar .text-xl {
  font-size: 1.25rem;
}

.sidebar .rounded-md {
  border-radius: 0.375rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
    transition: width 0.3s ease-in-out;
  }

  .sidebar .ml-4 {
    margin-left: 0;
  }

  .sidebar .ml-6 {
    margin-left: 0;
  }

  .sidebar-header {
    display: none;
  }

  .sidebar .text-base {
    display: none;
  }

  .sidebar .w-12 {
    width: 48px;
  }
}
</style>