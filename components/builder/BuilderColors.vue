<template>
  <div>
    <!-- Primary color -->
    <div class="mb-4">
      <div class="headline mb-1">Primary Color</div>
      <v-color-picker
        mode="rgba"
        hide-mode-switch
        v-model="resume_primary_color"
      ></v-color-picker>
    </div>

    <!-- Header text color -->
    <div class="mb-4">
      <div class="headline mb-1">Header Text Color</div>
      <v-color-picker
        mode="rgba"
        hide-mode-switch
        v-model="resume_header_text_color"
      ></v-color-picker>
    </div>

    <!-- Text color -->
    <div class="mb-4">
      <div class="headline mb-1">Text Color</div>
      <v-color-picker
        mode="rgba"
        hide-mode-switch
        v-model="resume_text_color"
      ></v-color-picker>
    </div>


  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder';

export default {
  name: "BuilderColors",

  /**
   * Computed properties
   */
  computed: {
    resume_primary_color: getVuexBinder("resume_primary_color"),
    resume_header_text_color: getVuexBinder("resume_header_text_color"),
    resume_text_color: getVuexBinder("resume_text_color"),
  },

  /**
   * Methods
   */
  methods: {
    
  }
  
}
</script>
