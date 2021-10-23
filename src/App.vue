<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    document.querySelector("body").className = "white";
  },
};
</script>
<style scoped>
/* #app{
  height:100vh;
  overflow:scroll-y;
} */
</style>>

