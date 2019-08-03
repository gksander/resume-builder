<template>
  <div>
    <resume-basic></resume-basic>
  </div>
</template>

<script>

import ResumeBasic from "~/components/resumes/ResumeBasic";

export default {
  name: "ExportPage",
  layout: "plain",

  components: {
    ResumeBasic,
  },

  mounted() {
    setTimeout(() => {
      window.print();
    }, 500);
  }
}
</script>
