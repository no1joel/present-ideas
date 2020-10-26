<template>
    <nav class="navbar sticky-top navbar-light bg-light">
        <router-link to="/" class="navbar-brand">Present Ideas</router-link>
          <form
            v-if="currentUser && viewingUser"
            class="form-inline"
          >
            <label class="my-1 mr-2" for="top-nav-current-user-select">Me:</label>
            <PeoplePicker
                id="top-nav-current-user-select"
                v-bind:value="currentUser"
                v-on:input="currentUserChanged"
            />
            <label class="my-1 mr-2 ml-3" for="top-nav-viewing-user-select">Viewing:</label>
            <PeoplePicker
                id="top-nav-viewing-user-select"
                v-bind:value="viewingUser"
                v-on:input="viewingUserChanged"
            />
        </form>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
import PeoplePicker from "./PeoplePicker.vue";

export default {
    components: {
        PeoplePicker
    },
    computed: {
        ...mapGetters([
            "currentUser",
            "viewingUser",
        ]),
    },
    methods: {
        currentUserChanged(currentUser) {
            this.$store.dispatch("setCurrentUser", { currentUser });
            this.updateCurrentPage()
        },
        viewingUserChanged(viewingUser) {
            this.$store.dispatch("setViewingUser", { viewingUser });
            this.updateCurrentPage()
        },
        updateCurrentPage() {
            this.$router.push({
                name: "list",
                params: {
                    user: this.currentUser,
                    viewing: this.viewingUser
                }
            })
        }
    }
}
</script>