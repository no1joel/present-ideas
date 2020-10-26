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
          v-if="!showClaimed"
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
      <p v-if="Claimed">Claimed by <em>{{ Claimed == currentUser ? "You!" : Claimed }}</em></p>
      <a v-if="Claimed" href="#unclaim">Clear?</a>
      <a v-if="!Claimed" href="#claim" class="btn btn-block btn-primary">Claim!</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    Claimed: {
      type: [String],
    },
    index: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      "viewingUser",
      "currentUser",
    ]),
    showClaimed() {
      return this.viewingUser !== this.currentUser;
    }
  },
  methods: {
    onDeleteClick() {
      this.$emit("delete-clicked", { index: this.Index })
    }
  }
};
</script>