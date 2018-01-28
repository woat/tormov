<template>
  <div class="home">
    <Search class="search" v-on:testemit="test"/>
    <Navi class="navi"/>
    <div class="movies">
      <h1 class="movies__headline">New Releases</h1>
      <Movie v-for="movie in movielist" :search="movie.title" />
    </div>
  </div>
</template>

<script>
import yts from '@/api/yts'
import Movie from '@/components/Movie'
import Search from '@/components/Search'
import Navi from '@/components/Navi'

export default {
  name: 'Home',
  components: { Movie, Search, Navi },
  data() {
    return {
      movie: [],
      movielist: [],
    }
  },
  methods: {
    test(msg) {
      console.log(msg)
    },
  },
  async created() {
    const list = await yts.list()
    this.movielist = list.data.data.movies
  }
}
</script>

<style>
.home{
  display: grid;

  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;

  grid-template-rows: 5rem auto;
  grid-template-columns: 25rem 1fr;
  grid-template-areas: 
  "search search"
  "navi movies"
}

.search {
  grid-area: search;
  justify-content: start;
}

.navi {
  grid-area: navi;
}

.movies {
  display: grid;
  grid-area: movies;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  grid-gap: 2rem;
  justify-items: center;

  overflow-y: auto;
  overflow-x: hidden;
}

.movies__headline {
  grid-column: 1 / -1;
  color: rgb(var(--grey));
  justify-self: start;
  font-weight: 200;
  padding: 5rem 1.5rem;
}
</style>
