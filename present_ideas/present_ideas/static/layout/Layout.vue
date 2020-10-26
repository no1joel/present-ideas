<template>
  <div>
    <TopNav />
    <slot />
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue"
export default {
  components: { TopNav },
}
</script>