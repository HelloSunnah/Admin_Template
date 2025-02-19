<template>
  <div class="sidebar">
    <div v-for="(menu, index) in menus" :key="index">
      <div @click="toggleSubmenu(menu)">
        <span>{{ menu.title }}</span>
      </div>
      <div v-if="menu.open" class="submenu">
        <ul>
          <li v-for="(item, index) in menu.items" :key="index">
            <router-link :to="item.link">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: 'Dashboard',
          open: true,
          items: [{ name: 'Overview', link: '/dashboard' }]
        },
      
      ]
    }
  },
  methods: {
    toggleSubmenu(menu) {
      menu.open = !menu.open
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #f4f4f4;
  width: 250px;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.submenu {
  padding-left: 20px;
}

.submenu ul {
  list-style-type: none;
  padding: 0;
}

.submenu li {
  padding: 5px 0;
}
</style>
