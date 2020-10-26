<template>
  <div
    v-bind:class="[
      'card',
      { 'bg-secondary text-white': showClaimed && Claimed },
    ]"
  >
    <LoadingIndicator v-if="loading" />
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
      <p v-if="Claimed">
        Claimed by <em>{{ Claimed == currentUser ? "You!" : Claimed }}</em>
      </p>
      <button
        v-if="Claimed"
        type="button"
        class="btn btn-block btn-link"
        v-on:click="onUnclaimClick"
      >
        Clear?
      </button>
      <button
        v-if="!Claimed"
        type="button"
        class="btn btn-block btn-primary"
        v-on:click="onClaimClick"
      >
        Claim!
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: { LoadingIndicator },
  props: {
    loading: {
      type: Boolean,
    },
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
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["viewingUser", "currentUser"]),
    showClaimed() {
      return this.viewingUser !== this.currentUser;
    },
  },
  methods: {
    onDeleteClick() {
      this.$emit("delete-clicked", { index: this.index });
    },
    onClaimClick() {
      this.$emit("claim-clicked", { index: this.index });
    },
    onUnclaimClick() {
      this.$emit("unclaim-clicked", { index: this.index });
    },
  },
};
</script>