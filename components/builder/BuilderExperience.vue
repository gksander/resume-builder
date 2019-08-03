<template>
  <div>
    <template
      v-for="(line, i) in resume_experience"
    >
      <!-- Title -->
      <v-text-field
        :key="`title-${i}`"
        filled label="Title"
        hide-details class="mb-3"
        :value="line.title"
        @input="updateLine(i, 'title', $event)"
        append-icon="fas fa-trash"
        @click:append="deleteLine(i)"
      ></v-text-field>
      <!-- Date -->
      <v-textarea
        :key="`date-${i}`"
        filled label="Date"
        hide-details class="mb-3"
        :value="line.date"
        @input="updateLine(i, 'date', $event)"
        :rows="1" auto-grow
      ></v-textarea>
      <!-- Description -->
      <v-textarea
        :key="`description-${i}`"
        filled label="Description"
        hide-details
        :value="line.description"
        @input="updateLine(i, 'description', $event)"
        :rows="1"
        auto-grow
      ></v-textarea>
      <v-divider
        class="my-4"
        :key="`divider-${i}`"
      ></v-divider>
    </template>

    <v-btn
      outlined color="primary" block
      @click="addLine"
    >Add New</v-btn>

  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder';

export default {
  name: "BuilderEducation",

  data: () => ({
    
  }),

  /**
   * Computed
   */
  computed: {
    resume_experience: getVuexBinder("resume_experience"),
  },

  /**
   * Methods
   */
  methods: {
    // Update a line
    updateLine(i, prop, val) {
      const line = {
        ...this.resume_experience[i],
        [prop]: val
      };

      this.$store.commit('SET_EXPERIENCE_LINE', { i, line });
    },

    // Add a line
    addLine() {
      this.$store.commit('ADD_EXPERIENCE_LINE');
    },

    // Delete a line
    deleteLine(i) {
      this.$store.commit('DELETE_EXPERIENCE_LINE', i);
    },

  }, // End methods
}
</script>
