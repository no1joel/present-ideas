<template>
  <nav class="navbar navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Present Ideas</router-link>
    <form v-if="currentUser && viewingUser">
      <div class="form-row">
        <div class="col-2 text-right">
          <label for="top-nav-current-user-select" class="my-1">Me:</label>
        </div>
        <div class="col-4">
          <PeoplePicker
            id="top-nav-current-user-select"
            class="d-inline-block"
            v-bind:value="currentUser"
            v-on:input="currentUserChanged"
          />
        </div>
        <div class="col-2 text-right">
          <label for="top-nav-viewing-user-select" class="my-1">
            Viewing:
          </label>
        </div>
        <div class="col-4">
          <PeoplePicker
            id="top-nav-viewing-user-select"
            v-bind:value="viewingUser"
            v-on:input="viewingUserChanged"
          />
        </div>
      </div>
    </form>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import PeoplePicker from "./PeoplePicker.vue";

export default {
  components: {
    PeoplePicker,
  },
  computed: {
    ...mapGetters(["currentUser", "viewingUser"]),
  },
  methods: {
    currentUserChanged(currentUser) {
      this.$store.dispatch("setCurrentUser", { currentUser });
      this.updateCurrentPage();
    },
    viewingUserChanged(viewingUser) {
      this.$store.dispatch("setViewingUser", { viewingUser });
      this.updateCurrentPage();
    },
    updateCurrentPage() {
      this.$router.push({
        name: "list",
        params: {
          user: this.currentUser,
          viewing: this.viewingUser,
        },
      });
    },
  },
};
</script>