<template>
  <div class="color-picker">
    <button @click="setTheme('light')" class="white">Light</button>
    <button @click="setTheme('blue')" class="blue">Blue</button>
    <button @click="setTheme('gray')" class="gray">Gray</button>
  </div>
</template>

<script>
export default {
  methods: {
    setTheme(color) {
      this.$emit('change-theme', color);
    }
  }
};
</script>

<style scoped>
.color-picker button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
.light {
  background-color: white;
}
.blue {
  background-color: blue;
}
.gray {
  background-color: gray;
}
</style>
