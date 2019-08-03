// Function to generate vuex-computed binder
const getVuexBinder = name => ({
  get() {
    return this.$store.state[name];
  },
  set(val) {
    this.$store.commit('SET_VALUE', { key: name, value: val });
  }
});

export default getVuexBinder;