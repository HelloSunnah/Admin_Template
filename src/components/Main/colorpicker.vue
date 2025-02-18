<template>
  <div class="color-picker">
    <button @click="setTheme('pink')" class="pink">Pink</button>
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
.pink {
  background-color: pink;
}
.blue {
  background-color: blue;
}
.gray {
  background-color: gray;
}
</style>
