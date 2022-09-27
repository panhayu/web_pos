<template>
    <div class="text-left">
      <label class="text-gray label-text font-light"> {{ label }}</label>
      <div class="input-container">
        <input
          :class="[isWhiteBackground ? 'input-field-white' : 'input-field']"
          :name="name"
          :type="type"
          :value="modelValue"
          :placeholder="inputPlaceHolder"
          :autocomplete="isAutoComplete"
          @input="updateInput($event.target.value)"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BaseTextInput",
    data() {},
    props: {
      name: {
        type: String,
        default() {
          throw new Error("No form field name specified.");
        },
      },
      type: {
        type: String,
        default: "text",
      },
      modelValue: {
        type: [String, Boolean, Number],
        default: null,
      },
      label: {
        type: String,
        default: null,
      },
      inputPlaceHolder: {
        type: String,
        default: null,
      },
      isAutoComplete: {
        type: String,
        default: "on",
      },
    },
    emits: ["update:modelValue"],
    methods: {
      updateInput(value) {
        this.$emit("update:modelValue", value);
      },
    },
  };
  </script>
  
  <style scoped>
  .input-container input {
    margin: 5px 0;
    padding: 10px;
  }
  .input-field {
    border-radius: 14px;
    border: 1px solid var(--dark-gray);
    width: 100%;
    font-size: 18px;
  }
  .label-text {
    margin-bottom: 10px;
  }
  </style>