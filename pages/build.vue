<template>
  <div>
    <!-- Content body for resume preview -->
    <v-container class="pa-6">
      <v-responsive
        :aspect-ratio="8.5/11"
        class="blue"
        ref="resumeContainer"
      >
        <!-- <resume-basic></resume-basic> -->
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
            <resume-basic></resume-basic>
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
        <!-- Body... -->
        <div class="flex-grow-1 pa-3 overflow-auto">
          <v-tabs-items v-model="activeTab">
            <!-- Data -->
            <v-tab-item value="tab-data">
              <!-- About you -->
              <builder-intro class="mb-4"></builder-intro>
              <!-- Contact -->
              <builder-contact class="mb-4"></builder-contact>
            </v-tab-item>
            <!-- Style -->
            <v-tab-item value="tab-style">
              STYLES
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
              {{ tab.title }}
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

// Import components
import ResumeBasic from '~/components/resumes/ResumeBasic.vue';
import BuilderIntro from '~/components/builder/BuilderIntro.vue';
import BuilderContact from '~/components/builder/BuilderContact.vue';
import { setInterval, setTimeout, clearTimeout, clearInterval } from 'timers';

// Export component
export default {
  name: "BuildPage",

  /**
   * Components
   */
  components: {
    // Builder components
    BuilderIntro,
    BuilderContact,

    // Resume types
    ResumeBasic,
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
      {id: "tab-data", title: "Data"},
      {id: "tab-style", title: "Styles"},
    ],
    activeTab: "tab-data"
  }),

  /**
   * Computed
   */
  computed: {
    // "Sidenav" model for controlling sidenav
    sidenav: getVuexBinder("sidenav"),
    // Resume values
    resume_name: getVuexBinder("resume_name"),

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
