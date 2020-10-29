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
          :lat-lng="toLonLat(point.coordinates).reverse()"
          :key="`${point.link}-map`"
          v-for="point in startingPoints"
          :zIndexOffset="point.link == selectedStartingPointCard ? 1000 : 0"
        >
          <l-icon :icon-anchor="[18, 36]" :tooltip-anchor="[18, -18]">
            <v-icon
              large
              :color="
                point.link == selectedStartingPointCard
                  ? 'red'
                  : 'blue lighten-2'
              "
            >
              mdi-map-marker
            </v-icon>
          </l-icon>
          <l-tooltip>{{ point.name }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { LMap, LTileLayer, LMarker, LTooltip, LIcon } from "vue2-leaflet"
import { toLonLat } from "ol/proj"

export default {
  props: ["startingPoints"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LIcon
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 9,
      center: [52.518728, 4.866336],
      bounds: null
    }
  },
  computed: mapState(["selectedStartingPointCard"]),
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
    },
    toLonLat
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
