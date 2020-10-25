<template>
  <Layout>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <em v-if="loading">Loading...</em>
          <div class="card-columns">
            <PresentIdeaCard
              v-for="present in presents"
              v-bind="present"
              v-bind:key="present.index"
            />
          </div>
        </div>
      </div>
      <PresentIdeaForm
        v-bind:user="$route.params.user"
        v-on:added="fetchMyList"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import PresentIdeaCard from "../components/PresentIdeaCard.vue";
import PresentIdeaForm from "../components/PresentIdeaForm.vue";

export default {
  components: { Layout, PresentIdeaCard, PresentIdeaForm },
  data() {
    return { presents: [], loading: false };
  },
  mounted() {
    this.fetchMyList();
  },
  methods: {
    async fetchMyList() {
      this.loading = true;

      const url = `/api/my_list/${this.$route.params.user}`;
      const response = await fetch(url);
      const data = await response.json();
      const presents = data.presents;
      this.presents = presents;

      this.loading = false;
    },
  },
};
</script>