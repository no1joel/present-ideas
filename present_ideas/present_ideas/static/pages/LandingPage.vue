<template>
  <Layout>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="jumbotron">
            <p>Pick <strong>your name</strong> to get started 😊</p>
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
                v-on:click="goToMyPage"
              >
                Go
              </button>
            </div>

            <p>
              <small class="text-muted">
                I need to know who you are, first, so that when you're looking
                at your own list you can't see who's getting you what -- no
                surprises! I've not set up proper usernames and passwords
                because that's a faff. If you don't see your name there,
                seriously who are you and how did you get here?
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import PeoplePicker from "../components/PeoplePicker.vue";

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
    goToMyPage() {
      this.$router.push({ name: "myList", params: { user: this.currentUser } });
    },
  },
};
</script>