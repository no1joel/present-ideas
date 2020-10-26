<template>
  <div>
    <TopNav />
    <div class="mt-3">
      <slot />
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue";
export default {
  components: { TopNav },
};
</script>