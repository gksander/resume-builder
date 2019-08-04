<template>
  <!-- Contact -->
  <div>
    <!-- Loop through contact lines -->
    <v-text-field
      v-for="(line, i) in resume_skills" :key="`tool-${i}`"
      filled hide-details
      :label="`Tool ${i + 1}`"
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
    <icon-selector
      @select="selectIcon($event)"
      v-model="iconSelectorVisible"
    ></icon-selector>
  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder';
import IconSelector from '~/components/IconSelector'

export default {
  name: "BuilderContact",

  components: {
    IconSelector
  },

  data: () => ({
    iconSelectorVisible: false,
    activeContactLineIndex: -1,
  }),

  /**
   * Computed
   */
  computed: {
    resume_skills: getVuexBinder("resume_skills"),
  },

  /**
   * Methods
   */
  methods: {
    // Update a line
    updateLine(i, val) {
      const line = {
        ...this.resume_skills[i],
        body: val
      };

      this.$store.commit('SET_SKILL_LINE', { i, line });
    },

    // Add a line
    addLine() {
      this.$store.commit('ADD_SKILL_LINE');
    },

    // Delete a line
    deleteLine(i) {
      this.$store.commit('DELETE_SKILL_LINE', i);
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
        ...this.resume_skills[i],
        icon
      };
      // Commit it to Vuex
      this.$store.commit('SET_SKILL_LINE', { i, line });

      // Close dialog
      this.iconSelectorVisible = false;
    }

  }, // End methods
}
</script>
