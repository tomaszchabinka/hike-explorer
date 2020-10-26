<template>
  <v-container>
    <v-row>
      <v-col class="col-5">
        <List :startingPoints="startingPoints" />
      </v-col>
      <v-col class="col-7">
        <Map :startingPoints="startingPoints" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import List from "@/components/List"
import Map from "@/components/Map"
import { toLonLat } from "ol/proj"

export default {
  name: "Home",
  data: () => ({
    startingPoints: [
      {
        name: "Startpunt Abbekerk",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--abbekerk/2049/",
        trails: [
          "Ommetje Abbekerk (rood)",
          "Rondje De Hooge Weere (groen) vanaf startpunt Abbekerk"
        ],
        coordinates: toLonLat([558935.6, 6933405.61]).reverse()
      },
      {
        name: "Startpunt Berkhout",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--berkhout/2096/",
        trails: ["Ommetje Oosteinde (rood)", "Slimtochtroute (groen)"],
        coordinates: toLonLat([556188.69, 6916679.1]).reverse()
      },
      {
        name: "Startpunt De Weere",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt--de-weere/2055/",
        trails: [
          "Langereisroute (blauw) vanaf Startpunt De Weere",
          "Opmeerder Wuivertocht (geel) vanaf Startpunt De Weere",
          "Rondje De Hooge Weere (groen) vanaf startpunt De Weere"
        ],
        coordinates: toLonLat([555132.92, 6933858.37]).reverse()
      },
      {
        name: "Startpunt s-Gravelandse Buitenplaatsen",
        link:
          "https://www.wandelnetwerknoordholland.nl/startpunten/startpunt-s-gravelandse-buitenplaatsen/1665/",
        trails: [
          "Gele route vanaf startpunt 's-Gravelandse Buitenplaatsen",
          "Groene route vanaf startpunt 's-Gravelandse Buitenplaatsen",
          "'s-Gravelandse Buitenplaatsenroute"
        ],
        coordinates: toLonLat([520557.19, 6887816.13]).reverse()
      }
    ]
  }),
  computed: {},
  components: {
    List,
    Map
  },
  methods: {
    toLonLat
  }
}
</script>
