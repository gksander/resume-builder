<template>
  <div
    class="resume-wrapper"
    :style="{
      color: resume_text_color
    }"
  >
    <div class="pa-8">
      CLEAN RESUME COMING SOON
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import marked from 'marked';
marked.setOptions({
  gfm: true,
  breaks: true
});


export default {
  name: "ResumeClean",
  
  /**
   * Computed
   */
  computed: {
    ...mapState([
      "resume_name",
      "resume_title",
      "resume_objective",
      "resume_contact",
      "resume_tools",
      "resume_education",
      "resume_experience",
      "resume_primary_color",
      "resume_text_color",
      "resume_header_text_color",
    ]),
  },

  
}
</script>
