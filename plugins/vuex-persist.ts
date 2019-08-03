import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  (<any>window).onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
    }).plugin(store);
  });
}