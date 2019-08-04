<template>
  <div
    class="resume-wrapper"
    :style="{
      color: resume_text_color
    }"
  >
    <!-- Header -->
    <div
      class="header"
      :style="{
        backgroundImage: `url('/img/rain-drops.jpg')`,
        backgroundSize: '100%',
        backgroundPositionY: '50%',
        backgroundColor: resume_primary_color,
        backgroundBlendMode: 'multiply',
        color: resume_header_text_color,
      }"
    >
      <div
        :style="{
          fontSize: '32pt',
          fontWeight: 'bold'
        }"
      >{{ resume_name }}</div>
      <div
        :style="{
          fontSize: '16pt',
        }"
      >{{ resume_title }}</div>
    </div>

    <!-- Body -->
    <v-container class="pa-8" grid-list-lg>
      <v-layout row>
        <!-- Left column -->
        <v-flex xs8 class="pr-8">
          <!-- Objective -->
          <div class="mb-3">
            <div
              class="section-header"
              :style="{
                color: resume_primary_color
              }"
            >Objective</div>
            <div
              v-html="marked(resume_objective)"
            ></div>
          </div>

          <!-- Experience -->
          <div>
            <div
              class="section-header"
              :style="{
                color: resume_primary_color
              }"
            >Experience</div>
            <div
              v-for="(line, i) in resume_experience" :key="`edline-${i}`"
              :class="[
                i!=resume_experience.length-1 ? 'mb-4' : ''
              ]"
            >
              <div
                class="d-flex flex-row justify-space-between"
              >
                <div class="font-weight-bold" v-html="line.title"></div>
                <div class="flex-grow-0" v-html="line.date"></div>
              </div>
              <div
                v-html="marked(line.description)"
              ></div>
            </div>
          </div>


        </v-flex> <!-- End left column -->
        <!-- Right column -->
        <v-flex xs4>
          <!-- Contact -->
          <div class="mb-3">
            <div
              class="section-header"
              :style="{
                color: resume_primary_color
              }"
            >Contact</div>
            <div
              v-for="(line, i) in resume_contact" :key="`contact-line-${i}`"
              class="contact-line mb-1"
            >
              <div class="contact-line-icon">
                <v-icon :color="resume_text_color">{{ line.icon }}</v-icon>
              </div>
              <div
                v-html="line.body"
                class="contact-line-body"
              ></div>
            </div>
          </div>

          <!-- Skills -->
          <div class="mb-3">
            <div
              class="section-header"
              :style="{
                color: resume_primary_color
              }"
            >Skills</div>
            <div
              v-for="(line, i) in resume_skills" :key="`contact-line-${i}`"
              class="contact-line mb-1"
            >
              <div class="contact-line-icon">
                <v-icon :color="resume_text_color">{{ line.icon }}</v-icon>
              </div>
              <div
                v-html="line.body"
                class="contact-line-body"
              ></div>
            </div>
          </div>

          <!-- Education -->
          <div class="mb-3">
            <div
              class="section-header"
              :style="{
                color: resume_primary_color
              }"
            >Education</div>
            <div
              v-for="(line, i) in resume_education" :key="`edline-${i}`"
              :class="[
                i!=resume_education.length-1 ? 'mb-2' : ''
              ]"
            >
              <div class="d-flex flex-row justify-space-between">
                <div
                  class="flex flex-grow-1 pa-0 font-weight-bold"
                >{{ line.title }}</div>
                <div class="flex pa-0 flex-grow-0">{{ line.date }}</div>
              </div>
              <div
                v-html="marked(line.description)"
              ></div>
            </div>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
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
  name: "ResumeBasic",

  computed: {
    ...mapState([
      "resume_name",
      "resume_title",
      "resume_objective",
      "resume_contact",
      "resume_skills",
      "resume_education",
      "resume_experience",
      "resume_primary_color",
      "resume_text_color",
      "resume_header_text_color",
    ]),
  },

  methods: {
    marked,
  },

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 130pt;
  text-align: center;
  line-height: 2.5em;
}

.section-header {
  font-size: 18pt;
  font-weight: bold;
}

.contact-line {
  display: flex;
  flex-direction: row;
  align-content: center;
  
  .contact-line-icon {
    width: 20pt;
    text-align: center;
  }
  
  .contact-line-body {
    padding-left: 6pt;
  }
}

</style>
