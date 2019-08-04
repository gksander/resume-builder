<template>
  <div>
    <resume-selected></resume-selected>
  </div>
</template>

<script>

import ResumeSelected from "~/components/resumes/ResumeSelected";

export default {
  name: "ExportPage",
  layout: "plain",

  components: {
    ResumeSelected,
  },

  mounted() {
    setTimeout(() => {
      window.print();
    }, 500);
  }
}
</script>
