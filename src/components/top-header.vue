<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="info">
      <b-navbar-brand href="#"
        >Anciens meubles pour une nouvelle vie</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">A propos</b-nav-item>
          <b-nav-item to="/connexion">Se connecter</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="search">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Chercher"
              v-model="searchText"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Chercher</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    search() {
      console.log(this.searchText);
      this.$store.dispatch("search", { text: this.searchText });
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
};
</script>

<style lang="scss" scoped>
#nav a.router-link-exact-active {
  color: white;
}
</style>
