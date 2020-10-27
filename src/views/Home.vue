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
import List from "@/components/List"
import Map from "@/components/Map"
import Filters from "@/components/Filters"
import { toLonLat } from "ol/proj"
import { mapState } from "vuex"

export default {
  name: "Home",
  data: () => ({
    startingPoints: [
      {
        name: "Startpunt Abbekerk",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--abbekerk/2049/",
        trails: [
          {
            name: "Ommetje Abbekerk (rood)",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/ommetje-abbekerk-rood/96548/",
            length: 3.3,
            dogFriendly: true,
            color: "red"
          },
          {
            name: "Rondje De Hooge Weere (groen) vanaf startpunt Abbekerk",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/rondje-de-hooge-weere-groen-vanaf-startpunt-abbekerk/96549/",
            length: 10.52,
            dogFriendly: false,
            color: "green"
          }
        ],
        coordinates: toLonLat([558935.6, 6933405.61]).reverse()
      },
      {
        name: "Startpunt Berkhout",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--berkhout/2096/",
        trails: [
          {
            name: "Ommetje Oosteinde (rood)",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/ommetje-oosteinde-rood/96552/",
            length: 2.95,
            dogFriendly: true,
            color: "red"
          },
          {
            name: "Slimtochtroute (groen)",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/slimtochtroute-groen/96553/",
            length: 5.92,
            dogFriendly: true,
            color: "green"
          }
        ],
        coordinates: toLonLat([556188.69, 6916679.1]).reverse()
      },
      {
        name: "Startpunt De Weere",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--de-weere/2055/",
        trails: [
          {
            name: "Langereisroute (blauw) vanaf Startpunt De Weere",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/langereisroute-blauw-vanaf-startpunt-de-weere/96558/",
            length: 18.1,
            dogFriendly: false,
            color: "blue"
          },
          {
            name: "Opmeerder Wuivertocht (geel) vanaf Startpunt De Weere",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/opmeerder-wuivertocht-geel-vanaf-startpunt-de-weere/96556/",
            length: 13.94,
            dogFriendly: false,
            color: "yellow"
          },
          {
            name: "Rondje De Hooge Weere (groen) vanaf startpunt De Weere",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/rondje-de-hooge-weere-groen-vanaf-startpunt-de-weere/96555/",
            length: 10.52,
            dogFriendly: false,
            color: "green"
          }
        ],
        coordinates: toLonLat([555132.92, 6933858.37]).reverse()
      },
      {
        name: "Startpunt s-Gravelandse Buitenplaatsen",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt-s-gravelandse-buitenplaatsen/1665/",
        trails: [
          {
            name: "Gele route vanaf startpunt 's-Gravelandse Buitenplaatsen",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/gele-route-vanaf-startpunt-s-gravelandse-buitenplaatsen/87214/",
            length: 4.95,
            dogFriendly: true,
            color: "yellow"
          },
          {
            name: "Groene route vanaf startpunt 's-Gravelandse Buitenplaatsen",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/groene-route-vanaf-startpunt-s-gravelandse-buitenplaatsen/87213/",
            length: 2.48,
            dogFriendly: true,
            color: "green"
          },
          {
            name: "'s-Gravelandse Buitenplaatsenroute",
            link:
              "https://www.wandelnetwerknoordholland.nl/startpunten/route/s-gravelandse-buitenplaatsenroute/77301/",
            length: 14.93,
            dogFriendly: true
          }
        ],
        coordinates: toLonLat([570325.92, 6845648.98]).reverse()
      }
    ]
  }),
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
    startingPointsOnTheMap(startingPoints) {
      return startingPoints.filter(startingPoint => {
        let lat = startingPoint.coordinates[0]
        let lng = startingPoint.coordinates[1]

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
    },
    toLonLat
  },
  components: {
    List,
    Map,
    Filters
  }
}
</script>
