<template>
  <select
    class="custom-select"
    v-on:input="$emit('input', $event.target.value)"
  >
    <option disabled v-bind:selected="!value">Who are you?</option>
    <option v-if="loading" disabled>Loading...</option>
    <option v-for="person in people" v-bind:key="person.name">
      {{ person[0].toUpperCase() + person.slice(1) }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
    people: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>