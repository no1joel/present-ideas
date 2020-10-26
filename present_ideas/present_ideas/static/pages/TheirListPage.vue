<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <em v-if="loading">Loading...</em>
        <div class="card-columns">
          <PresentIdeaCard
            v-for="present in presents"
            v-bind="present"
            v-bind:key="present.index"
            v-bind:loading="loading"
            v-on:claim-clicked="claimClicked"
            v-on:unclaim-clicked="unclaimClicked"
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

export default {
  components: { Layout, PresentIdeaCard, PresentIdeaFormCard },
  data() {
    return { presents: [], loading: false };
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    ...mapGetters(["viewingUser", "currentUser"]),
  },
  methods: {
    async fetchList() {
      this.loading = true;

      const url = `/api/their_list/${this.viewingUser}`;
      const response = await fetch(url);
      const data = await response.json();
      const presents = data.presents;
      this.presents = presents;

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
  },
};
</script>