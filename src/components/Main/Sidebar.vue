<template>
  <div :class="['sidebar', theme]">
 
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
export default {
  props: ['theme'] // Accept the theme prop from App.vue
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color 0.3s;
}
.sidebar.pink {
  background-color: pink; /* Sidebar turns pink */
}
.sidebar.blue {
  background-color: blue; /* Sidebar turns blue */
}
.sidebar.gray {
  background-color: gray; /* Sidebar turns gray */
}
</style>
