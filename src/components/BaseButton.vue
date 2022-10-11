<template>
  <button
    :class="[isSecondary ? 'bg-light-blue text-blue' : 'bg-blue text-white','px-6 py-3 rounded-md font-sans duration-500 cursor-pointer hover:opacity-80 disabled:bg-dark-gray disabled:cursor-auto disabled:hover:opacity-100']">
    <slot></slot>
  </button>
</template>
  
<script>
export default {
  name: "BaseButton",
  props: {
    isSecondary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
  
<style scoped>

</style>