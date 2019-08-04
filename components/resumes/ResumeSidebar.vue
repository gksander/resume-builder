<template>
  <div
    class="resume-wrapper"
    :style="{
      color: resume_text_color
    }"
  >
    <div
      class="fill-height d-flex flex-row"
    >
      <!-- Left column -->
      <div
        :style="{
          width: '40%',
          backgroundColor: resume_primary_color,
          color: resume_header_text_color,
        }"
        class="pa-6"
      >
        <!-- Icon -->
        <div class="header mb-4">
          <v-icon
            size="84"
            :color="resume_header_text_color"
            @click="iconSelectorVisible = true;"
          >{{ resume_icon }}</v-icon>
        </div>

        <!-- Objective -->
        <div class="mb-4">
          <div class="section-header">Objective</div>
          <div v-html="marked(resume_objective)"></div>
        </div>

        <!-- Contact -->
        <div class="mb-4">
          <div class="section-header">Contact</div>
          <div
            v-for="(line, i) in resume_contact" :key="`contact-line-${i}`"
            class="contact-line mb-1"
          >
            <div class="contact-line-icon">
              <v-icon :color="resume_header_text_color">{{ line.icon }}</v-icon>
            </div>
            <div
              v-html="line.body"
              class="contact-line-body"
            ></div>
          </div>
        </div>

        <!-- Skills -->
        <div>
          <div class="section-header">Skills</div>
          <div
            v-for="(line, i) in resume_skills" :key="`contact-line-${i}`"
            class="contact-line mb-1"
          >
            <div class="contact-line-icon">
              <v-icon :color="resume_header_text_color">{{ line.icon }}</v-icon>
            </div>
            <div
              v-html="line.body"
              class="contact-line-body"
            ></div>
          </div>
        </div>

      </div> <!-- End left column -->
      <!-- Right column -->
      <div
        class="pa-6"
        :style="{
          width: '60%'
        }"
      >
        <!-- Header -->
        <div
          class="header mb-4"
          :style="{
            backgroundColor: resume_primary_color,
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
        </div> <!-- End header -->

        <!-- Experience -->
        <div class="mb-4">
          <div class="section-header">Experience</div>
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

        <!-- Education -->
        <div class="mb-4">
          <div class="section-header">Education</div>
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

        
      </div> <!-- End right column -->
    </div>

    <!-- Dialog for selecting icon -->
    <icon-selector
      @select="selectIcon($event)"
      v-model="iconSelectorVisible"
    ></icon-selector>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import getVuexBinder from '~/assets/js/vuexComputedBinder';
import marked from 'marked';
import IconSelector from '~/components/IconSelector';

marked.setOptions({
  gfm: true,
  breaks: true
});


export default {
  name: "ResumeSidebar",

  components: {
    IconSelector,
  },

  data: () => ({
    iconSelectorVisible: false,
  }),

  /**
   * Computed
   */
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
    resume_icon: getVuexBinder("resume_icon"),
  },

  /**
   * Methods
   */
  methods: {
    marked,

    // Selecting icon
    selectIcon (icon) {
      this.$nextTick(() => {
        this.resume_icon = icon;
        this.iconSelectorVisible = false;
      })
    }
  }

  
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 80pt;
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
