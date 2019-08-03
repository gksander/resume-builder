<template>
  <div>
    <template
      v-for="(line, i) in resume_education"
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
      <!-- Date range -->
      <v-text-field
        :key="`date-${i}`"
        filled label="Date"
        hide-details class="mb-3"
        :value="line.date"
        @input="updateLine(i, 'date', $event)"
      ></v-text-field>
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
        class="my-3"
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
    resume_education: getVuexBinder("resume_education"),
  },

  /**
   * Methods
   */
  methods: {
    // Update a line
    updateLine(i, prop, val) {
      const line = {
        ...this.resume_education[i],
        [prop]: val
      };

      this.$store.commit('SET_EDUCATION_LINE', { i, line });
    },

    // Add a line
    addLine() {
      this.$store.commit('ADD_EDUCATION_LINE');
    },

    // Delete a line
    deleteLine(i) {
      this.$store.commit('DELETE_EDUCATION_LINE', i);
    },

  }, // End methods
}
</script>
