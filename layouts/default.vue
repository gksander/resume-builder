<template>
  <v-app>
    <!-- Body content -->
    <v-content>
      <nuxt />
    </v-content>

    <!-- App Bar Here -->
    <v-app-bar
      app clipped-left
    >
      <v-btn
        v-if="isMenuButtonVisible"
        icon class="mx-1"
        @click="sidenav = !sidenav"
      >
        <v-icon>fas fa-bars</v-icon>
      </v-btn>
      <v-btn
        to="/" exact
        icon class="mx-1"
      >
        <v-icon>fas fa-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="/build"
        icon class="mx-1"
      >
        <v-icon>fas fa-tools</v-icon>
      </v-btn>
    </v-app-bar>

  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",

  /**
   * Computed properties
   */
  computed: {
    // Should we show menu button
    isMenuButtonVisible() {
      return /build/i.test(this.$route.path);
    },

    // "Sidenav" model for controlling sidenav
    sidenav: {
      get() {
        return this.$store.state.sidenav;
      },
      set (val) {
        this.$store.commit('SET_VALUE', {key: 'sidenav', value: val});
      }
    },
  }

}
</script>
