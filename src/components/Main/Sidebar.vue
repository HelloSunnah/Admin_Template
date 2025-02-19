<template>
  <div :class="['sidebar', theme, positionClass]">
    <!-- Sidebar Header -->
    <div class="flex items-center justify-center p-4">
      <button @click="toggleSidebar" class="text-gray-500 focus:outline-none">
        <img src="@/assets/img/ati-logo.png" alt="Admin Panel" class="h-18 w-full" />
      </button>
    </div>

    <!-- Sidebar Menu -->
    <nav class="flex flex-col space-y-4 px-2 pt-12 flex-grow">
      <ul class="list-none space-y-3">
        <li v-for="item in menuItems" :key="item.id" class="relative">
          <!-- Menu Button -->
          <button @click="handleItemClick(item)"
            class="flex items-center w-full text-gray-300 hover:text-gray-700 hover:bg-blue-500 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            :class="currentRoute === item.route ? 'text-blue-800 bg-blue-200' : 'text-gray-800 bg-gray-100'">

            <!-- Left Label (when sidebar is right) or Right Label (when sidebar is left) -->
            <span v-if="isOpen && position === 'right'"
              class="ml-4 text-base font-medium transition-all ease-in-out duration-300">{{ item.label }}</span>

            <!-- Icon Section -->
            <div :class="[
              'w-12 h-10 flex items-center justify-center transition-all',
              position === 'right' ? 'rounded-l-full ml-auto' : 'rounded-r-full',
              currentRoute === item.route ? 'bg-blue-600 text-black' : 'bg-gray-200 text-gray-600'
            ]">
              <i :class="item.icon" class="w-6 h-6 mt-2"></i>
            </div>

            <!-- Right Label (when sidebar is left) or Left Label (when sidebar is right) -->
            <span v-if="isOpen && position === 'left'"
              class="mr-4 text-base font-medium transition-all ease-in-out duration-300">{{ item.label }}</span>

          </button>

          <!-- Collapsible Submenu -->
          <ul v-if="item.subItems && item.collapsed" class="pl-6 space-y-2 mt-2">
            <li v-for="sub in item.subItems" :key="sub.id" class="bg-white rounded-lg shadow-md">
              <button @click="handleSubItemClick(sub)"
                class="p-2 text-gray-800 hover:bg-blue-600 hover:text-gray transition-all rounded-md w-full flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                <i v-if="sub.icon" :class="sub.icon" class="w-4 h-4 text-gray-600"></i>
                <span class="text-sm">{{ sub.label }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: ['theme', 'position'], // Accept the position prop from parent component
  data() {
    return {
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
        { id: 'about', label: 'About', icon: 'fas fa-tachometer-alt', route: '/about' },
        {
          id: 'Theme', label: 'Theme', icon: 'fas fa-file-alt', collapsed: false, subItems: [
            { id: 'Sidebar-Customization', label: 'Sidebar Customization', route: '/dashboard', icon: 'fas fa-calendar-day' },
          ]
        },
      ],
      isOpen: true, // Toggle this for opening/closing sidebar
    };
  },
  computed: {
    currentRoute() {
      return useRoute().path; // Dynamically track the current route
    },
    positionClass() {
      return this.position === 'right' ? 'right-0' : 'left-0'; // Apply left or right positioning
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle'); // Emit event to parent component for sidebar toggle
    },
    handleItemClick(item) {
      if (item.subItems && item.subItems.length) {
        item.collapsed = !item.collapsed; // Toggle collapse for items with subItems
      } else {
        this.$router.push(item.route); // Navigate to route if no subItems
      }
    },
    handleSubItemClick(subItem) {
      this.$router.push(subItem.route); // Navigate to sub-item's route
    },
  },
};
</script>

<style scoped>
/* Sidebar Customization */
.sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: var(--sidebar-bg-color, #1a202c);
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
}

/* Positioning classes */
.sidebar .right-0 {
  right: 0;
}

.sidebar .left-0 {
  left: 0;
}

/* Theme Classes */
.sidebar.light {
  background-color: white;
}

.sidebar.blue {
  background-color: blue;
}

.sidebar.gray {
  background-color: gray;
}

/* Collapsed Menu Items */
.sidebar .pl-6 {
  padding-left: 1.5rem;
}
</style>
