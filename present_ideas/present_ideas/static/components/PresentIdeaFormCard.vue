<template>
  <div class="card">
    <LoadingIndicator v-if="saving" />
    <div class="card-header">
      <h5 class="card-title m-0" v-linkified>Add New!</h5>
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
            placeholder="Something I want..."
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
            placeholder="Enter a link to a specific thing, a description of what you want, why you want it, anything!"
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
  },
};
</script>