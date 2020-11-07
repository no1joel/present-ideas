<template>
  <div class="card">
    <LoadingIndicator v-if="saving" />
    <div class="card-header">
      <h5 class="card-title m-0" v-linkified>Add New!</h5>
      <p v-if="!isForSelf" class="card-text text-right text-muted">
        <small>
          {{ user }} won't see this when they look at their list, but everyone
          else will!
        </small>
      </p>
    </div>
    <div class="card-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="thing-input">Thing*</label>
          <input
            type="text"
            name="thing"
            id="thing-input"
            class="form-control"
            v-bind:placeholder="thingPlaceholder"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label for="price-input">Price</label>
          <input
            type="text"
            name="price"
            id="price-input"
            class="form-control"
            placeholder="Enter a price or a range, e.g. £10-£20"
            v-model="price"
          />
        </div>
        <div class="form-group">
          <label for="notes-input">Notes</label>
          <textarea
            name="notes"
            id="notes-input"
            class="form-control"
            v-bind:placeholder="notesPlaceholder"
            v-model="notes"
          ></textarea>
        </div>
        <button
          type="button"
          class="btn btn-success btn-block"
          v-bind:disabled="addDisabled"
          v-on:click="add"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: { LoadingIndicator },
  props: {
    user: String,
    addedBy: String,
  },
  data() {
    return {
      name: "",
      price: "",
      notes: "",
      saving: false,
    };
  },
  methods: {
    async add() {
      this.saving = true;
      await fetch("/api/add_idea/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: this.user,
          thing: this.name,
          price: this.price,
          notes: this.notes,
          added_by: this.addedBy,
        }),
      });

      this.name = "";
      this.price = "";
      this.notes = "";

      this.saving = false;
      this.$emit("added");
    },
  },
  computed: {
    addDisabled() {
      return this.saving || !this.name;
    },
    isForSelf() {
      return this.user === this.addedBy;
    },
    thingPlaceholder() {
      if (this.isForSelf) {
        return "Something I want...";
      }
      return "Something they might want...";
    },
    notesPlaceholder() {
      if (this.isForSelf) {
        return "Enter a link to a specific thing, a description of what you want, why you want it, anything!";
      }
      return "Enter a link to a specific thing, a description of what they want, why they might want it, anything!";
    },
  },
};
</script>