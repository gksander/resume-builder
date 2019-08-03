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
      <!-- Toggle menu -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            @click="sidenav = !sidenav"
          >
            <v-icon>fas fa-bars</v-icon>
          </v-btn>
        </template>
        <span>Toggle menu</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            @click="exportResume"
          >
            <v-icon>fas fa-print</v-icon>
          </v-btn>
        </template>
        <span>Print to PDF</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Download -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            @click="downloadData"
          >
            <v-icon>fas fa-download</v-icon>
          </v-btn>
        </template>
        <span>Download as JSON</span>
      </v-tooltip>
      <!-- Upload -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            @click="onUploadButtonClick"
          >
            <v-icon>fas fa-upload</v-icon>
          </v-btn>
        </template>
        <span>Import JSON</span>
      </v-tooltip>
    </v-app-bar>

    <!-- Download link -->
    <a
      :style="{
        display: 'none',
        position: 'fixed',
        left: '-1000%',
        top: '-1000%',
      }"
      ref="dlButton"
    ></a>

    <!-- Upload file -->
    <input
      type="file"
      :style="{
        display: 'none',
        position: 'fixed',
        left: '-1000%',
        top: '-1000%',
      }"
      ref="fileInput"
      accept=".json"
      @input="onFileInput"
    >

  </v-app>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder';

export default {
  name: "DefaultLayout",

  /**
   * Computed properties
   */
  computed: {
    // "Sidenav" model for controlling sidenav
    sidenav: getVuexBinder("sidenav"),
  },

  /**
   * Methods
   */
  methods: {
    // Print/export resume
    exportResume() {
      const exportLink = `${window.location.origin}/export`;
      window.open(exportLink, '_blank');
    },

    // Download as JSON
    downloadData() {
      const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.$store.state))}`

      this.$refs.dlButton.setAttribute("href", data);
      this.$refs.dlButton.setAttribute("download", "resume.json");
      this.$refs.dlButton.click();
    },

    // Uploading JSON
    onUploadButtonClick() {
      this.$refs.fileInput.click();
    },

    // When a file is selected...
    onFileInput(evt) {
      // Pull the file from the event
      const files = evt.target.files,
            file = files.length > 0 ? files[0] : null;

      // Need a file
      if (!file) return;

      // Create a file reader and tell it how to handle the file
      const reader = new FileReader();
      reader.onload = e => {
        try {
          // Parse out the data
          const data = JSON.parse(e.target.result);
          // Commit to Vuex
          this.$store.commit('SET_RESUME_DATA', data);
        } catch (err) {
          console.log(err);
        }
      };
      // Read the file
      reader.readAsText(file);

    }

  },

}
</script>
