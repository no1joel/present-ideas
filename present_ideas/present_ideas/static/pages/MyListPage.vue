<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <LoadingIndicator v-if="loading" />
        <div class="card-columns">
          <PresentIdeaFormCard
            v-bind:user="$route.params.user"
            v-bind:added-by="$route.params.user"
            v-on:added="fetchMyList"
          />
          <PresentIdeaCard
            v-for="present in presents"
            v-bind="present"
            v-bind:key="
              present.index + present.Thing + present.Price + present.Notes
            "
            v-bind:loading="loading"
            v-on:delete-clicked="deleteClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    this.fetchMyList();
  },
  computed: {
    user() {
      return this.$route.params.user;
    },
    baseUrl() {
      return window.location.origin || "http://localhost";
    },
  },
  methods: {
    async fetchMyList() {
      this.loading = true;

      const url = `${this.baseUrl}/api/my_list/${this.user}`;
      const response = await fetch(url);
      const data = await response.json();
      const presents = data.presents;
      this.presents = presents.reverse();

      this.loading = false;
    },
    async deleteClicked({ index }) {
      this.loading = true;
      const url = `${this.baseUrl}/api/delete_idea/`;
      const data = {
        index: index,
        user: this.user,
      };
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      this.fetchMyList();
    },
  },
};
</script>