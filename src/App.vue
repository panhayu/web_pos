<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
  const defaultLayout = 'default'
  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    },
    watch: {
    $route(to) {
      document.title = to.meta.title || "Canteen Web POS";
    },
  },
  }
</script>