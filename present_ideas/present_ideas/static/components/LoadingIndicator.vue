<template>
  <div
    class="d-flex justify-content-center align-items-center"
    v-bind:style="{
      background: 'rgba(255,255,255,0.4)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }"
  >
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>