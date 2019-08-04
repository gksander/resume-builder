<template>
  <div>
    <!-- Content body for resume preview -->
    <v-container
      class="pa-6"
      style="max-width: 700px;"
    >
      <v-responsive
        :aspect-ratio="8.5/11"
        class="blue"
        ref="resumeContainer"
      >
        <div
          class="grey"
          :style="{
            position: 'absolute',
            left: 0, right: 0, top: 0, bottom: 0,
            overflow: 'hidden',
          }"
        >
          <div
            :style="{
              transform: `scale(${scaleFactor})`,
              transformOrigin: `left top`,
            }"
          >
            <resume-selected></resume-selected>
          </div>
        </div>
      </v-responsive>
    </v-container>

    <!-- Nav drawer for controls -->
    <v-navigation-drawer
      app clipped
      mobile-break-point="800"
      width="350"
      v-model="sidenav"
    >
      <div
        class="fill-height d-flex flex-column"
      >
        <!-- Header -->
        <div class="flex-grow-0 pa-3 font-weight-bold text-center title">
          {{ sidenavTitle }}
        </div>
        <v-divider></v-divider>

        <!-- Body -->
        <div class="flex-grow-1 pa-3 overflow-auto">

          <v-tabs-items v-model="activeTab">
            <!-- Info -->
            <v-tab-item value="tab-info">
              <builder-info></builder-info>
            </v-tab-item>
            <!-- Data -->
            <v-tab-item value="tab-data">
              <v-expansion-panels popout>
                <!-- Intro -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Intro</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <builder-intro></builder-intro>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Contact -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Contact</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <builder-contact></builder-contact>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Tools -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Tools</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <builder-tools></builder-tools>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Education -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Education</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <builder-education></builder-education>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Experience -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Experience</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <builder-experience></builder-experience>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-tab-item>
            <!-- Style -->
            <v-tab-item value="tab-style">
              <v-expansion-panels popout>
                <!-- Theme -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Resume Style</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-btn
                      v-for="style in ResumeList" :key="style.id"
                      block outlined
                      class="mb-3"
                      :disabled="style.id === resume_style"
                      @click="resume_style = style.id"
                    >{{ style.title }}</v-btn>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Primary Color -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Primary Color</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-color-picker
                      mode="rgba"
                      hide-mode-switch
                      v-model="resume_primary_color"
                    ></v-color-picker>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Header Text Color -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Header Text Color</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-color-picker
                      mode="rgba"
                      hide-mode-switch
                      v-model="resume_header_text_color"
                    ></v-color-picker>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Text Color -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="subtitle-1 font-weight-bold">Text Color</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-color-picker
                      mode="rgba"
                      hide-mode-switch
                      v-model="resume_text_color"
                    ></v-color-picker>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                
              </v-expansion-panels> <!-- End styling panels -->
            </v-tab-item>
          </v-tabs-items>
        </div>
        <!-- Tabs -->
        <v-divider></v-divider>
        <div class="flex-grow-0">
          <v-tabs
            grow show-arrows
            v-model="activeTab"
          >
            <v-tab
              v-for="tab in tabs" :key="`${tab.id}`"
              :href="`#${tab.id}`"
            >
              <v-icon>{{ tab.icon }}</v-icon>
            </v-tab>
          </v-tabs>
        </div>
      </div>
    </v-navigation-drawer>


    <!-- Fixed element, off the screen. Used for computing scale factor -->
    <div
      :style="{
        'width': '8.5in',
        'height': '11in',
        'position': 'fixed',
        'left': '-1000%',
        'top': '-1000%',
        'background-color': 'red',
        'z-index': '-10',
        'opacity': 0,
        'visibility': 'hidden'
      }"
      ref="fixedSize"
    >
    </div>

  </div>
</template>

<script>
import getVuexBinder from '~/assets/js/vuexComputedBinder'
import ResumeList from '~/assets/js/ResumeList'
import { setInterval, setTimeout, clearTimeout, clearInterval } from 'timers';

// Import components
import BuilderInfo from '~/components/builder/BuilderInfo.vue';
import BuilderIntro from '~/components/builder/BuilderIntro.vue';
import BuilderContact from '~/components/builder/BuilderContact.vue';
import BuilderTools from '~/components/builder/BuilderTools.vue';
import BuilderEducation from '~/components/builder/BuilderEducation.vue';
import BuilderExperience from '~/components/builder/BuilderExperience.vue';

// Resumes
import ResumeSelected from '~/components/resumes/ResumeSelected.vue';


// Export component
export default {
  name: "BuildPage",

  /**
   * Components
   */
  components: {
    // Builder components
    BuilderInfo,
    BuilderIntro,
    BuilderContact,
    BuilderTools,
    BuilderEducation,
    BuilderExperience,
    ResumeSelected
  },

  /**
   * Data
   */
  data: () => ({
    sidenavVisible: true,
    scaleFactor: 1,
    mountInterval: null,
    mountIntervalRunCount: 0,
    tabs: [
      {id: "tab-info", title: "Info", icon: "fas fa-info"},
      {id: "tab-data", title: "Data", icon: "fas fa-edit"},
      {id: "tab-style", title: "Styles", icon: "fas fa-paint-brush"},
    ],
    activeTab: "tab-info",
    ResumeList,
  }),

  /**
   * Computed
   */
  computed: {
    // "Sidenav" model for controlling sidenav
    sidenav: getVuexBinder("sidenav"),
    // Resume values
    resume_name: getVuexBinder("resume_name"),
    resume_primary_color: getVuexBinder("resume_primary_color"),
    resume_header_text_color: getVuexBinder("resume_header_text_color"),
    resume_text_color: getVuexBinder("resume_text_color"),
    resume_style: getVuexBinder("resume_style"),

    // Title
    sidenavTitle() {
      switch (this.activeTab) {
        case "tab-info": return "Information";
        case "tab-data": return "Resume Data";
        case "tab-style": return "Style";
      }
    },
  },

  /**
   * Methods
   */
  methods: {
    /**
     * Compute scale factor
     */
    computeScaleFactor() {
      try {
        // Get widths of the two containers
        let virtualW = this.$refs.resumeContainer.$el.clientWidth,
          actualW = this.$refs.fixedSize.clientWidth;
        // Scale factor is the ratio between them.
        this.scaleFactor = virtualW/actualW;
      } catch (_) {
        this.scaleFactor = 1;
      }
    },

    mountTimeoutFunc() {
      this.computeScaleFactor();
    }


  },

  /**
   * On mount, set up some listeners
   */
  mounted() {
    /**
     * Due to how vuetify shifts things on mount, recompute scale factor a few times for the first ~3 seconds.
     */
    this.mountInterval = setInterval(() => {
      this.computeScaleFactor();
      this.mountIntervalRunCount++;
      if (this.mountIntervalRunCount > 10) {
        clearInterval(this.mountInterval);
      }
    }, 250);

    window.addEventListener('resize', this.computeScaleFactor);

  },

  /**
   * Before destroying, need to tear down some listeners
   */
  beforeDestroy() {
    if (this.mountInterval) clearInterval(this.mountInterval);
    window.removeEventListener('resize', this.computeScaleFactor);
  },

}
</script>

<style lang="scss">
.v-tabs--fixed-tabs .v-tab {
  width: auto;
}
</style>
