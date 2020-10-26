<template>
  <Layout>
      <MyListPage
        v-if="user === viewing"
      />
      <div
        v-if="user != viewing"
        >Not done yet</div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import MyListPage from "./MyListPage.vue";

export default {
    components: {
        Layout,
        MyListPage
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