<template>
  <v-container fluid>
    <v-list
      :key="startingPoint.link"
      v-for="startingPoint in visibleStartingPoints"
    >
      <v-card elevation="2" class="mx-auto">
        <v-card-title
          >{{ startingPoint.name }}
          <v-btn text icon :href="startingPoint.link" target="_blank">
            <v-icon medium color="">
              mdi-link-box-outline
            </v-icon>
          </v-btn></v-card-title
        >
        <v-card-text>
          <div :key="trail.name" v-for="trail in startingPoint.trails">
            <v-row class="py-0">
              <v-col class="col-9 py-0">
                <v-icon v-if="trail.color" medium :color="trail.color">
                  mdi-arrow-right-box
                </v-icon>
                {{ trail.name }}
                <v-btn text icon :href="trail.link" target="_blank">
                  <v-icon small color="">
                    mdi-link-box
                  </v-icon>
                </v-btn>
                <v-icon medium :color="trail.dogFriendly ? 'green' : 'red'">
                  mdi-dog-side
                </v-icon>
              </v-col>
              <v-col class="py-1">
                <strong>{{ trail.length }} km</strong>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "List",
  props: ["startingPoints"],
  computed: {
    visibleStartingPoints() {
      return this.startingPoints
    }
  }
}
</script>

<style lang="scss" scoped></style>
