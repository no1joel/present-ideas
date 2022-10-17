<template>
  <div
    v-bind:class="[
      'card',
      { 'bg-secondary text-white': viewingOtherUser && Claimed },
    ]"
  >
    <LoadingIndicator v-if="loading" />
    <div class="card-header">
      <h5 v-if="viewingOtherUser" class="card-title m-0" v-linkified>
        {{ Thing }}
      </h5>
      <h5 v-else-if="!editingThing" class="card-title m-0" v-linkified v-on:click="onNameClick">
        {{ Thing }}
      </h5>
      <h5 v-else>
        <form action="" v-on:submit="onSave">
          <div class="form-group">
            <input type="text" name="thing" id="thing" class="form-control h5" :value="Thing" v-on:input="onNameInput" ref="input">
            <div class="btn-group">
              <button type="button" class="btn btn-success" v-on:click="onSave">Save</button>
              <button type="button" class="btn btn-default" v-on:click="onCancel">Cancel</button>
            </div>
          </div>
        </form>
      </h5>
      <small>
        <p
          v-if="Price"
          v-bind:class="[
            'card-text text-right text-muted',
            viewingOtherUser && 'mb-1',
          ]"
        >
          Price: {{ Price }}
        </p>
        <p v-if="viewingOtherUser" class="card-text text-right text-muted">
          Added by: {{ AddedBy }}
        </p>
      </small>
      <p v-if="addedByCurrent" class="card-text text-right mt-1">
        <popper z-index="9999">
          <template #content>
            <div v-if="!loading" class="popper popover">
              <div class="popover-header">Really delete?</div>
              <div class="popover-body">
                <button
                  type="button"
                  class="btn btn-block btn-danger"
                  v-on:click="onDeleteClick"
                >
                  Yep!
                </button>
              </div>
            </div>
          </template>
          <button
            slot="reference"
            type="button"
            class="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </popper>
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
    <div v-if="viewingOtherUser" class="card-footer">
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
import { nextTick } from "vue";
import { mapGetters } from "vuex";
import LoadingIndicator from "./LoadingIndicator.vue";
import Popper from "vue3-popper";

export default {
  components: { LoadingIndicator, popper: Popper },
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
    AddedBy: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      editingThing: false,
      newName: ""
    }
  },
  computed: {
    ...mapGetters(["viewingUser", "currentUser"]),
    viewingOtherUser() {
      return this.viewingUser !== this.currentUser;
    },
    addedByCurrent() {
      return this.AddedBy === this.currentUser;
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
    async onNameClick() {
      this.newName = this.Thing;
      this.editingThing = true;
      await nextTick()
      this.$refs.input.focus()
    },
    onNameInput(e) {
      this.newName = e.target.value; 
    },
    onCancel() {
      this.editingThing = false;
    },
    onSave(e) {
      if (e) {
        e.preventDefault();
      }
      this.$emit("update-name", { index: this.index, name: this.newName })
    }
  },
};
</script>