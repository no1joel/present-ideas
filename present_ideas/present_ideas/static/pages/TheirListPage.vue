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

export default {
  components: { Layout, PresentIdeaCard, PresentIdeaFormCard },
  data() {
    return { presents: [], loading: false };
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    ...mapGetters([
      "viewingUser",
      "currentUser",
    ]),
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
    async deleteClicked({ index }) {
      const url = "/api/delete_idea/"
      const data = {
        "index": index,
        "user": this.user
      }
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      this.fetchList()
    }
  },
};
</script>