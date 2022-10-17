<template>
  <div v-bind:class="[
    'card',
    { 'bg-secondary text-white': viewingOtherUser && Claimed },
  ]">
    <LoadingIndicator v-if="loading || saving" />
    <div class="card-header">
      <h5 v-if="viewingOtherUser || !editingName" class="card-title m-0" v-linkified v-on:click="onNameClick">
        {{ Thing }}
      </h5>
      <h5 v-else>
        <form action="" v-on:submit="onSave">
          <div class="form-group">
            <input type="text" name="thing" id="thing" class="form-control h5" :value="newName" v-on:input="onNameInput" ref="nameInput" :disabled="saving || loading">
            <div class="btn-group">
              <button type="button" class="btn btn-success" v-on:click="onSave">Save</button>
              <button type="button" class="btn btn-outline-secondary" v-on:click="onCancel">Cancel</button>
            </div>
          </div>
        </form>
      </h5>
      <small>
        <p v-bind:class="[
          'card-text text-right text-muted',
          viewingOtherUser && 'mb-1',
        ]">
          <span v-on:click="onPriceClick">Price: <span v-if="!editingPrice">{{ Price || "🤷‍♀️" }}</span></span>
        <div v-if="editingPrice">
          <div class="form-group">
            <input type="text" name="price" id="price" class="form-control" :value="newPrice" v-on:input="onPriceInput" ref="priceInput" :disabled="saving || loading">
            <div class="btn-group">
              <button type="button" class="btn btn-success" v-on:click="onSave">Save</button>
              <button type="button" class="btn btn-outline-secondary" v-on:click="onCancel">Cancel</button>
            </div>
          </div>

        </div>
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
                <button type="button" class="btn btn-block btn-danger" v-on:click="onDeleteClick">
                  Yep!
                </button>
              </div>
            </div>
          </template>
          <button slot="reference" type="button" class="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </popper>
      </p>
    </div>
    <div v-if="Notes" class="card-body">
      <p v-for="(para, index) in Notes.split('\n')" v-bind:key="para + index" class="card-text" v-linkified>
        {{ para }}
      </p>
    </div>
    <div v-if="viewingOtherUser" class="card-footer">
      <p v-if="Claimed">
        Claimed by <em>{{ Claimed == currentUser ? "You!" : Claimed }}</em>
      </p>
      <button v-if="Claimed" type="button" class="btn btn-block btn-link" v-on:click="onUnclaimClick">
        Clear?
      </button>
      <button v-if="!Claimed" type="button" class="btn btn-block btn-primary" v-on:click="onClaimClick">
        Claim!
      </button>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import Popper from "vue3-popper";
import { mapGetters } from "vuex";
import LoadingIndicator from "./LoadingIndicator.vue";

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
      saving: false,
      editingName: false,
      newName: "",
      editingPrice: false,
      newPrice: ""
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
      if (this.viewingOtherUser) {
        return;
      }
      this.newName = this.Thing;
      this.editingName = true;
      await nextTick()
      this.$refs.nameInput.focus()
    },
    onNameInput(e) {
      this.newName = e.target.value;
    },
    onPriceInput(e) {
      this.newPrice = e.target.value;
    },
    async onPriceClick() {
      if (this.viewingOtherUser) {
        return;
      }
      this.newPrice = this.Price;
      this.editingPrice = true;
      await nextTick()
      this.$refs.priceInput.focus()
    },
    onCancel() {
      this.editingName = false;
      this.editingPrice = false;
    },
    onSave(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.editingName) {
        this.$emit("update-name", { index: this.index, name: this.newName })
      } else if (this.editingPrice) {
        this.$emit("update-price", { index: this.index, price: this.newPrice })
      }
    }
  },
};
</script>