<template>
  <v-container fluid>
    <v-list
      :key="startingPoint.name"
      v-for="startingPoint in visibleStartingPoints"
    >
      <v-card elevation="2" class="mx-auto">
        <v-card-title>{{ startingPoint.name }}</v-card-title>
        <v-card-text>
          <div :key="trail" v-for="trail in startingPoint.trails">
            <div>
              {{ trail }}
            </div>
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
