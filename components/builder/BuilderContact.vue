<template>
  <!-- Contact -->
  <div>
    <div class="headline mb-3">Contact</div>
    <!-- Loop through contact lines -->
    <v-text-field
      v-for="(line, i) in resume_contact" :key="`contact-${i}`"
      outlined hide-details
      :label="`Line ${i + 1}`"
      :value="line.body"
      @input="updateLine(i, $event)"
      append-icon="fas fa-trash"
      @click:append="deleteLine(i)"
      :prepend-icon="line.icon"
      @click:prepend="startIconSelect(i)"
      class="mb-3"
    ></v-text-field>
    <!-- Add new -->
    <v-btn
      block outlined color="primary"
      @click="addLine"
    >Add new</v-btn>

    <!-- Dialog for selecting icon -->
    <v-dialog
      v-model="iconSelectorVisible"
      width="400"
    >
      <v-card>
        <v-card-title>Select Icon</v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-md class="pa-3">
          <v-layout row wrap>
            <v-flex
              v-for="icon in icons" :key="`icon-${icon}`"
              xs3 sm2
            >
              <v-btn
                icon
                @click="selectIcon(icon)"
              >
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder';
import icons from '~/assets/config/icons';

export default {
  name: "BuilderContact",

  data: () => ({
    iconSelectorVisible: false,
    activeContactLineIndex: -1,
    icons,
  }),

  /**
   * Computed
   */
  computed: {
    resume_contact: getVuexBinder("resume_contact"),
  },

  /**
   * Methods
   */
  methods: {
    // Update a line
    updateLine(i, val) {
      const line = {
        ...this.resume_contact[i],
        body: val
      };

      this.$store.commit('SET_CONTACT_LINE', { i, line });
    },

    // Add a line
    addLine() {
      this.$store.commit('ADD_CONTACT_LINE');
    },

    // Delete a line
    deleteLine(i) {
      this.$store.commit('DELETE_CONTACT_LINE', i);
    },

    // Start icon selection process
    startIconSelect(i) {
      this.activeContactLineIndex = i;
      this.iconSelectorVisible = true;
    },

    selectIcon (icon) {
      // Create updated line
      const i = this.activeContactLineIndex;
      const line = {
        ...this.resume_contact[i],
        icon
      };
      // Commit it to Vuex
      this.$store.commit('SET_CONTACT_LINE', { i, line });

      // Close dialog
      this.iconSelectorVisible = false;
    }

  }, // End methods
}
</script>
