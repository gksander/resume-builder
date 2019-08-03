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
      width="300"
      v-model="sidenavVisible"
    >
      DRAWER
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

<script lang="ts">
import Vue from 'vue'

// Import components
import ResumeBasic from '~/components/ResumeBasic.vue';
import { setInterval, setTimeout, clearTimeout, clearInterval } from 'timers';


export default Vue.extend({
  name: "BuildPage",

  /**
   * Components
   */
  components: {
    ResumeBasic,
  },

  /**
   * Data
   */
  data: () => ({
    sidenavVisible: <boolean|null>true,
    scaleFactor: 1,
    mountInterval: <any>null,
    mountIntervalRunCount: <number>0,
  }),

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
        let virtualW = (<any>this.$refs.resumeContainer).$el.clientWidth,
          actualW = (<HTMLElement>this.$refs.fixedSize).clientWidth;
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

})
</script>
