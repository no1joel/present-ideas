<template>
  <div class="card">
    <div class="card-body">
      <form class="form-horizontal">
        <h5 class="card-title">Add New</h5>
        <div class="form-group">
          <label for="thing-input">Thing*</label>
          <input
            type="text"
            name="thing"
            id="thing-input"
            class="form-control"
            required
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
            v-model="price"
          />
        </div>
        <div class="form-group">
          <label for="notes-input">Notes</label>
          <textarea
            name="notes"
            id="notes-input"
            class="form-control"
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
export default {
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