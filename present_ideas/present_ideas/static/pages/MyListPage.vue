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
              v-on:delete-clicked="deleteClicked"
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
  computed: {
    user() {
      return this.$route.params.user;
    }
  },
  methods: {
    async fetchMyList() {
      this.loading = true;

      const url = `/api/my_list/${this.user}`;
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
      this.fetchMyList()
    }
  },
};
</script>