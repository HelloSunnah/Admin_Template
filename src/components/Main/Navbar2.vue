<template>
  <div class="navbar">
    <h1>Admin Panel</h1>
    <div class="theme-toggle">
      <button @click="toggleTheme">Toggle Theme</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      const newTheme = this.$store.state.themeMode === 'light' ? 'dark' : 'light'
      this.$store.dispatch('changeTheme', newTheme)
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.theme-toggle button {
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
