<template>
  <div class="search">
    <div class="search__logo">
      <i class="fas fa-hdd fa-2x"></i>
      <h1>Tormov.eu</h1>
    </div>
    <div class="search__box">
      <i class="fas fa-search"></i>
      <input class="search__input" v-model="searchQuery" type="text" placeholder="Search movies">
      <button class="btn" @click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    $route: function route(to) {
      if (!to.query.search) return false
      this.searchQuery = to.query.search
      this.search()
    }
  },
  methods: {
    search() {
      this.$emit('sendSearch', this.searchQuery)
      this.$router.push({ query: { search: this.searchQuery } })
    }
  }
}
</script>

<style scoped>
.search {
  background: rgb(var(--pink));
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 25rem 1fr;
  align-items: center;
  color: rgb(var(--white));
}

.search__box {
  justify-self: start;
  padding-left: 5rem;
}

.search__input {
  color: rgb(var(--white));
  background: transparent;
  border: 0px;
  padding: 1rem 10rem;
  padding-left: .5rem;
  font-size: 1.5rem;
}

.search__input::placeholder {
  color: rgb(var(--white));
}

.search__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

h1 {
  font-size: 2.5rem;
  padding-left: .5rem;
}
</style>
