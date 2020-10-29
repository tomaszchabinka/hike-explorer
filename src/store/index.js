import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boundaries: {
      northEast: {
        lat: 90,
        lng: 180
      },
      southWest: {
        lat: -90,
        lng: -180
      }
    },
    length: {
      min: 0,
      max: 20
    },
    dogFriendlyOnly: false,
    page: 1,
    selectedStartingPointCard: undefined
  },
  getters: {
    page: state => state.page
  },
  mutations: {
    SET_MAP_BOUNDARIES(state, { _northEast, _southWest }) {
      state.boundaries.northEast = _northEast
      state.boundaries.southWest = _southWest
      state.page = 1
    },
    SET_PREFERED_TRIAL_LENGTH(state, [minLength, maxLength]) {
      state.length.min = minLength
      state.length.max = maxLength
      state.page = 1
    },
    SET_DOG_FRIENDLY_TRAILS_ONLY(state, dogFriendlyOnly) {
      state.dogFriendlyOnly = dogFriendlyOnly
      state.page = 1
    },
    SET_PAGE(state, page) {
      state.page = page
    },
    SELECT_STARTING_POINT(state, startingPointLink) {
      state.selectedStartingPointCard = startingPointLink
    },
    DESELECT_STARTING_POINT(state, startingPointLink) {
      console.log(state.startingPointLink)
      if (state.selectedStartingPointCard == startingPointLink) {
        state.selectedStartingPointCard = undefined
      }
    }
  },
  actions: {
    setMapBoundaries(context, boundaries) {
      context.commit("SET_MAP_BOUNDARIES", boundaries)
    },
    setPreferedTrialLength(context, lengthRange) {
      context.commit("SET_PREFERED_TRIAL_LENGTH", lengthRange)
    },
    setDogFriendlyTrailsOnly(context, dogFriendlyOnly) {
      context.commit("SET_DOG_FRIENDLY_TRAILS_ONLY", dogFriendlyOnly)
    },
    setCurrentPage(context, page) {
      context.commit("SET_PAGE", page)
    },
    selectStartingPoint(context, startingPointLink) {
      context.commit("SELECT_STARTING_POINT", startingPointLink)
    },
    deselectStartingPoint(context, startingPointLink) {
      context.commit("DESELECT_STARTING_POINT", startingPointLink)
    }
  },
  modules: {}
})
