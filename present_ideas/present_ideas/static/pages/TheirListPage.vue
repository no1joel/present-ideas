<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <LoadingIndicator v-if="loading" />
        <div class="card-columns">
          <PresentIdeaFormCard
            v-bind:user="viewingUser"
            v-bind:added-by="currentUser"
            v-on:added="fetchList"
          />
          <PresentIdeaCard
            v-for="present in presents"
            v-bind="present"
            v-bind:key="
              present.index + present.Thing + present.Price + present.Notes
            "
            v-bind:loading="loading"
            v-on:claim-clicked="claimClicked"
            v-on:unclaim-clicked="unclaimClicked"
            v-on:delete-clicked="deleteClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "../layout/Layout.vue";
import PresentIdeaCard from "../components/PresentIdeaCard.vue";
import PresentIdeaFormCard from "../components/PresentIdeaFormCard.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

export default {
  components: {
    Layout,
    PresentIdeaCard,
    PresentIdeaFormCard,
    LoadingIndicator,
  },
  data() {
    return { presents: [], loading: false };
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    ...mapGetters(["viewingUser", "currentUser"]),
  },
  watch: {
    viewingUser() {
      this.presents = [];
      this.fetchList();
    },
  },
  methods: {
    async fetchList() {
      this.loading = true;

      const url = `/api/their_list/${this.viewingUser}`;
      const response = await fetch(url);
      const data = await response.json();
      const presents = data.presents;
      this.presents = presents.reverse();

      this.loading = false;
    },
    async claimClicked({ index }) {
      this.loading = true;
      const url = "/api/claim_idea/";
      const data = {
        index: index,
        for_user: this.viewingUser,
        by_user: this.currentUser,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.fetchList();
    },
    async unclaimClicked({ index }) {
      this.loading = true;
      const url = "/api/unclaim_idea/";
      const data = {
        index: index,
        for_user: this.viewingUser,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.fetchList();
    },
    async deleteClicked({ index }) {
      this.loading = true;
      const url = "/api/delete_idea/";
      const data = {
        index: index,
        user: this.viewingUser,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.fetchList();
    },
  },
};
</script>