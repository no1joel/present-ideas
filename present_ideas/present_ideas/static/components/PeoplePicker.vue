<template>
  <select>
    <option disabled>Select a person</option>
    <option v-if="loading" disabled>Loading...</option>
    <option v-for="person in people" v-bind:key="person.name">
      {{ person[0].toUpperCase() + person.slice(1) }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      people: [],
      loading: true,
    };
  },
  mounted() {
    this.loadPeople();
  },
  methods: {
    async loadPeople() {
      this.loading = true;
      const response = await fetch("/api/person");
      const data = await response.json();
      const names = data.names;
      this.people = names.sort();
      this.loading = false;
    },
  },
};
</script>