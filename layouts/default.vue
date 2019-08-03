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
      <v-btn icon to="/">
        <v-icon>fas fa-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/build">
        <v-icon>fas fa-tools</v-icon>
      </v-btn>
    </v-app-bar>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "DefaultLayout"
})
</script>
