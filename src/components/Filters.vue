<template>
  <div class="blue lighten-5" id="filter">
    <v-container class="py-0 ">
      <v-row class="py-0">
        <v-col class="col-3 pb-0 pt-4">
          <v-range-slider
            v-model="selectedRange"
            min="0"
            max="20"
            step="0.5"
            thumb-label
            @end="updatePreferedRange"
            label="Trail Length"
          />
        </v-col>
        <v-col class="col-2 py-0">
          <v-switch
            v-model="dogFriendly"
            label="Only Dog Friendly"
            style="justify-content: flex-end"
            @change="updateDogFriendlyOnly"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data: () => ({
    selectedRange: [0, 20],
    dogFriendly: false
  }),

  methods: {
    ...mapActions(["setPreferedTrialLength", "setDogFriendlyTrailsOnly"]),
    updatePreferedRange(context) {
      this.setPreferedTrialLength([
        context[0],
        context[1] != 20 ? context[1] : 9999
      ])
    },
    updateDogFriendlyOnly(context) {
      this.setDogFriendlyTrailsOnly(context)
    }
  }
}
</script>

<style lang="scss" scoped>
#filter {
  position: fixed;
  height: 64px;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  z-index: 9999;
}
</style>
