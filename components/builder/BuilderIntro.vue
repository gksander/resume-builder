<template>
  <!-- About you -->
  <div>
    <!-- <div class="headline mb-3">Intro</div> -->
    <!-- Name -->
    <v-text-field
      filled hide-details class="mb-4"
      label="Name" v-model="resume_name"
    ></v-text-field>
    <!-- Title -->
    <v-text-field
      filled hide-details class="mb-4"
      label="Title" v-model="resume_title"
    ></v-text-field>
    <!-- Objective -->
    <v-textarea
      filled hide-details
      label="Objective" v-model="resume_objective"
      :rows="1" auto-grow
    ></v-textarea>
  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder'

export default {
  name: "BuilderIntro",

  computed: {
    resume_name: getVuexBinder("resume_name"),
    resume_title: getVuexBinder("resume_title"),
    resume_objective: getVuexBinder("resume_objective"),
  }
}
</script>
