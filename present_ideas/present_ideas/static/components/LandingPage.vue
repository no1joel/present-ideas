<template>
  <Layout>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="jumbotron">
            <p>Please pick <strong>your name</strong> to get started.</p>
            <div class="form-row">
              <PeoplePicker
                class="col-sm-10"
                v-bind:loading="loading"
                v-bind:people="people"
                v-model="currentUser"
              />
              <button
                type="button"
                class="btn btn-block btn-success col-sm-2"
                v-bind:disabled="!currentUser"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import PeoplePicker from "./PeoplePicker.vue";

export default {
  components: {
    Layout,
    PeoplePicker,
  },
  data() {
    return {
      people: [],
      loading: true,
      currentUser: undefined,
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