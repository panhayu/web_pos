<template>
  <router-view></router-view>
</template>

<script>
  export default {
    watch: {
    $route(to) {
      document.title = to.meta.title || "AAA-C Admin Portal";
    },
  },
  }
</script>