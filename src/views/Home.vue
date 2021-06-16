<template>
  <div class="home">
    <b-container>
      <b-row align-v="center">
        <furniture_card
          :name="furniture.name"
          :id="furniture.id"
          v-for="furniture in getDisplayFurnitures"
          :key="furniture.id"
        ></furniture_card>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="getRows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Furniturecard from "@/components/Furniturecard.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  async mounted() {
    this.getRecords();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 3
    };
  },
  components: { "furniture_card": Furniturecard},
  computed: {
    ...mapGetters(["getRows", "getDisplayFurnitures"])
  },
  methods: {
    paginate(currentPage) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage });
    },
    async getRecords() {
      await this.$store.dispatch("fetchFurnitures");
    }
  }
};
</script>
<style lang="scss" scoped>
// b-card {
// padding: 10px;
// }
</style>
