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
        backgroundColor: resume_primary_color,
        color: resume_header_text_color
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
    <v-container class="pa-6" grid-list-lg>
      <v-layout row>
        <!-- Left column -->
        <v-flex xs8>
          <!-- Objective -->
          <div class="mb-3">
            <div
              class="section-header"
            >Objective</div>
            <div
              v-html="resume_objective.replace(/\n/g, '<br />')"
            ></div>
          </div>

          <!-- Experience -->
          <div>
            <div
              class="section-header"
            >Experience</div>
          </div>


        </v-flex> <!-- End left column -->
        <!-- Right column -->
        <v-flex xs4>
          <!-- Contact -->
          <div class="mb-3">
            <div
              class="section-header"
            >Contact</div>
            <div
              v-for="(line, i) in resume_contact" :key="`contact-line-${i}`"
              class="contact-line mb-1"
            >
              <div class="contact-line-icon">
                <v-icon :color="resume_text_color">{{ line.icon }}</v-icon>
              </div>
              <div v-html="line.body"></div>
            </div>
          </div>

          <!-- Education -->
          <div class="mb-3">
            <div
              class="section-header"
            >Education</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi qui, voluptatem reiciendis, obcaecati suscipit labore hic rem sit voluptatum commodi itaque earum temporibus architecto repellat explicabo animi in sint.</p>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
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
      "resume_objective",
      "resume_contact",
      "resume_primary_color",
      "resume_text_color",
      "resume_header_text_color",
    ]),
  },

  mounted() {
    console.log(this.resume_primary_color)
  }

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
    width: 24pt;
    // text-align: center;
  }
}
</style>
