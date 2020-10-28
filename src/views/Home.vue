<template>
  <div>
    <div>
      <Filters />
    </div>
    <v-container style="padding: 64px 0px 0px;">
      <v-row style="min-height: 710px">
        <v-col class="col-5">
          <List :startingPoints="visibleStartingPoints" />
        </v-col>
        <v-col class="col-7">
          <Map :startingPoints="visibleStartingPoints" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import hikes from "@/assets/hikes-full.json"
import List from "@/components/List"
import Map from "@/components/Map"
import Filters from "@/components/Filters"
import { mapState } from "vuex"
import { toLonLat } from "ol/proj"

export default {
  name: "Home",
  data: () => hikes,
  computed: {
    ...mapState({
      southWest: state => state.boundaries.southWest,
      northEast: state => state.boundaries.northEast,
      minLength: state => state.length.min,
      maxLength: state => state.length.max,
      dogFriendlyOnly: state => state.dogFriendlyOnly
    }),
    visibleStartingPoints() {
      let onlyPointsInTheBoundaries = this.startingPointsOnTheMap(
        this.startingPoints
      )
      let onlyTrailsInSelectedDistance = this.trailsInSelectedDistanceRange(
        onlyPointsInTheBoundaries
      )
      let onlyDogFriendlyTrails = this.dogFriendlyTrails(
        onlyTrailsInSelectedDistance
      )
      return onlyDogFriendlyTrails
    }
  },
  methods: {
    toLonLat,
    startingPointsOnTheMap(startingPoints) {
      console.log(this.southWest.lng + " " + this.southWest.lat)
      console.log(this.northEast.lng + " " + this.northEast.lat)
      return startingPoints.filter(startingPoint => {
        let [lat, lng] = toLonLat(startingPoint.coordinates).reverse()

        return (
          lng > this.southWest.lng &&
          lng < this.northEast.lng &&
          lat > this.southWest.lat &&
          lat < this.northEast.lat
        )
      })
    },
    trailsInSelectedDistanceRange(startingPoints) {
      return startingPoints
        .map(startingPoint => {
          return {
            ...startingPoint,
            trails: startingPoint.trails.filter(
              trail =>
                trail.length >= this.minLength && trail.length <= this.maxLength
            )
          }
        })
        .filter(startingPoint => startingPoint.trails.length > 0)
    },
    dogFriendlyTrails(startingPoints) {
      console.log(this.dogFriendlyOnly)

      return startingPoints
        .map(startingPoint => {
          return {
            ...startingPoint,
            trails: startingPoint.trails.filter(
              trail => !this.dogFriendlyOnly || trail.dogFriendly
            )
          }
        })
        .filter(startingPoint => startingPoint.trails.length > 0)
    }
  },
  components: {
    List,
    Map,
    Filters
  }
}
</script>
