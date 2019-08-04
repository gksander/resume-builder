<template>
  <component :is="resumeStyleConfig.component" />
</template>

<script>
import { mapState } from 'vuex';
import ResumeList from '~/assets/js/ResumeList'

// Resumes
import ResumeBasic from '~/components/resumes/ResumeBasic.vue';
import ResumeClean from '~/components/resumes/ResumeClean.vue';

export default {
  name: "ResumeSelected",

  /**
   * Components
   */
  components: {
    ResumeBasic,
    ResumeClean,
  },

  /**
   * Computed
   */
  computed: {
    ...mapState([
      "resume_style"
    ]),

    // Resume Style
    resumeStyleConfig() {
      return ResumeList.find(style => style.id === this.resume_style) || ResumeList[0];
    }
  },



}
</script>
