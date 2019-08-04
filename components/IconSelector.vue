<template>
  <v-dialog
    v-model="dialogShown"
    width="400"
  >
    <v-card>
      <v-card-title>
        <v-text-field
          filled label="Search" hide-details
          v-model="query"
          ref="search"
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-container grid-list-md fluid class="pa-3" style="height: 50vh">
        <v-layout row wrap>
          <v-flex
            v-for="icon in filteredIcons" :key="`icon-${icon}`"
            xs3 sm2
          >
            <v-btn
              icon
              @click="$emit('select', icon)"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import icons from '~/assets/config/icons';

export default {
  props: {
    value: {
      type: Boolean
    }
  },

  /**
   * Data
   */
  data() {
    return {
      icons,
      query: ""
    }
  },

  /**
   * Computed
   */
  computed: {
    dialogShown: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },

    // Filtered icons
    filteredIcons() {
      if (this.query.length < 1) return [];

      const searchRegEx = new RegExp(this.query, "i");
      return icons.filter(i => searchRegEx.test(i)).slice(0, 100);
    }
  },

  watch: {
    dialogShown(val) {
      if (val) {
        this.$nextTick(() => {
          if (this.$refs.search) this.$refs.search.focus();
        })
      }
    }
  }
}
</script>
