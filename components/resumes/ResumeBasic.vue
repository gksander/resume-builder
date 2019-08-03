<template>
  <div class="resume-wrapper">
    <div class="header">
      <div>{{ resume_name }}</div>
      <div>{{ resume_title }}</div>
    </div>
    <div class="pa-3">
      <div class="headline">Objective</div>
      <div v-html="resume_objective.replace(/\n/g, '<br />')"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ResumeBasic",

  computed: {
    ...mapState([
      "resume_name",
      "resume_title",
      "resume_objective"
    ]),
  }

}
</script>

<style lang="scss" scoped>
.header {
  background: blue;
  font-size: 16pt;
}
</style>
