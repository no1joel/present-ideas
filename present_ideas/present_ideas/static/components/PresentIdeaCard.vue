<template>
  <div
    v-bind:class="[
      'card',
      { 'bg-secondary text-white': showClaimed && Claimed },
    ]"
  >
    <div class="card-header">
      <h5 class="card-title m-0" v-linkified>
        {{ Thing }}
      </h5>
      <p v-if="Price" class="card-text text-right text-muted">
        {{ Price }}
      </p>
      <p class="card-text text-right">
        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          v-on:click="onDeleteClick"
        >
          Delete
        </button>
      </p>
    </div>
    <div v-if="Notes" class="card-body">
      <p
        v-for="(para, index) in Notes.split('\n')"
        v-bind:key="para + index"
        class="card-text"
        v-linkified
      >
        {{ para }}
      </p>
    </div>
    <div v-if="showClaimed" class="card-footer">
      <p v-if="Claimed">Claimed by <em>haven't done this bit yet!</em></p>
      <a href="#unclaim"> Clear? </a>
      <a href="#claim" class="btn btn-block btn-primary">Claim!</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Thing: {
      type: String,
    },
    Notes: {
      type: String,
    },
    Price: {
      type: [String, Number],
    },
    showClaimed: {
      type: Boolean,
    },
    Claimed: {
      type: [String],
    },
    index: {
      type: Number
    }
  },
  methods: {
    onDeleteClick() {
      this.$emit("delete-clicked", { index: this.Index })
    }
  }
};
</script>