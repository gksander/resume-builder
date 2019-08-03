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
        icon
        @click="exportResume"
        v-if="isMenuButtonVisible"
      >
        <v-icon>fas fa-print</v-icon>
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
  },

  /**
   * Methods
   */
  methods: {
    exportResume () {
      const exportLink = `${window.location.origin}/export`;
      window.open(exportLink, '_blank');
    }
  }

}
</script>
