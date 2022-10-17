<template>
  <select
    class="custom-select"
    :value="value"
    v-on:input="$emit('user-changed', $event.target.value)"
  >
    <option v-if="loading" disabled value="loading" v-bind:selected="value">
      Loading...
    </option>
    <option v-if="!loading" disabled v-bind:selected="!value" value="">
      Pick a name!
    </option>
    <option v-for="person in people" v-bind:key="person" v-bind:value="person">
      {{ person }}
    </option>
  </select>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      people: "people",
      loading: "loadingPeople",
    }),
  },
};
</script>