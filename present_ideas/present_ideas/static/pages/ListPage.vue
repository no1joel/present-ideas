<template>
  <Layout>
      <MyListPage
        v-if="user === viewing"
      />
      <TheirListPage
        v-if="user != viewing"
      />
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import MyListPage from "./MyListPage.vue";
import TheirListPage from "./TheirListPage.vue";

export default {
    components: {
        Layout,
        MyListPage,
        TheirListPage,
    },
    props: {
        user: {
            type: String
        },
        viewing: {
            type: String
        }
    }
}
</script>

<style>

</style>