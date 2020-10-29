<template>
  <v-container fluid>
    <div class="text-center">
      <v-pagination v-model="paginationState" :length="pages"></v-pagination>
    </div>
    <v-list
      :key="startingPoint.link"
      v-for="startingPoint in currentPageStartingPoints"
    >
      <v-card
        elevation="2"
        class="mx-auto"
        @mouseenter="selectedCard"
        @mouseleave="unselectedCard"
        :id="startingPoint.link"
      >
        <v-card-title
          >{{ startingPoint.name }}
          <v-btn text icon :href="startingPoint.link" target="_blank">
            <v-icon medium>
              mdi-link-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div :key="trail.name" v-for="trail in startingPoint.trails">
            <v-row class="py-0">
              <v-col class="col-9 py-0">
                <v-icon v-if="trail.color" medium :color="trail.color">
                  mdi-arrow-right-box
                </v-icon>
                {{ trail.name }}
                <v-btn text icon :href="trail.link" target="_blank">
                  <v-icon small>
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
import { mapActions, mapGetters } from "vuex"

export default {
  name: "List",
  props: {
    startingPoints: {
      type: Array
    }
  },
  methods: {
    ...mapActions([
      "setCurrentPage",
      "selectStartingPoint",
      "deselectStartingPoint"
    ]),
    selectedCard(context) {
      let selectedLink = context.srcElement.attributes.id.nodeValue
      this.selectStartingPoint(selectedLink)
    },
    unselectedCard(context) {
      let unselectedLink = context.srcElement.attributes.id.nodeValue
      console.log("unselectedLink: " + unselectedLink)
      this.deselectStartingPoint(unselectedLink)
    }
  },
  computed: {
    ...mapGetters(["page"]),
    paginationState: {
      get() {
        return this.page
      },
      set(page) {
        console.log(this.setCurrentPage)
        this.setCurrentPage(page)
      }
    },
    visibleStartingPoints() {
      return this.startingPoints
    },
    currentPageStartingPoints() {
      return this.visibleStartingPoints.slice(
        (this.paginationState - 1) * 10,
        (this.paginationState - 1) * 10 + 10
      )
    },
    pages() {
      return Math.ceil(this.startingPoints.length / 10)
    }
  }
}
</script>

<style lang="scss" scoped></style>
