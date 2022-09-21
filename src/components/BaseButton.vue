<template>
    <button class="main-btn px-6 py-3 rounded-md bg-blue font-sans text-white duration-500 cursor-pointer hover:opacity-80 disabled:bg-dark-gray">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: "BaseButton",
    props: {
      cancelButton: {
        type: Boolean,
        default: false,
      },
      greyButton: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .main-btn:disabled {
    background-color: var(--dark-gray);
    color: white;
    cursor: auto;
  }
  </style>