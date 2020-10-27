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
    dogFriendlyOnly: false
  },
  mutations: {
    SET_MAP_BOUNDARIES(state, { _northEast, _southWest }) {
      state.boundaries.northEast = _northEast
      state.boundaries.southWest = _southWest
    },
    SET_PREFERED_TRIAL_LENGTH(state, [minLength, maxLength]) {
      state.length.min = minLength
      state.length.max = maxLength
    },
    SET_DOG_FRIENDLY_TRAILS_ONLY(state, dogFriendlyOnly) {
      state.dogFriendlyOnly = dogFriendlyOnly
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
    }
  },
  modules: {}
})
