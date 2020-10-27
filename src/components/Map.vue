<template>
  <div class="container px-0" style="align-items: flex-start">
    <div id="view-port">
      <l-map
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          :lat-lng="point.coordinates"
          :key="`${point.name}-map`"
          v-for="point in startingPoints"
        >
          <l-tooltip>{{ point.name }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet"

export default {
  props: ["startingPoints"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 9,
      center: [52.518728, 4.866336],
      bounds: null
    }
  },
  methods: {
    ...mapActions(["setMapBoundaries"]),
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
      this.setMapBoundaries(this.bounds)
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  height: 100%;
}

#view-port {
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  top: 160px;
  height: 650px;
  align-self: flex-start;
}
</style>
