<template>
  <div class="home">
    <Search class="search" v-on:sendSearch="search"/>
    <Navi class="navi"/>
    <div class="movies">
      <Overlay :movie="movieData" :active="active" v-on:active="displayOverlay" />
      <h1 class="movies__headline"> {{ headline }}</h1>
      <Movie v-for="movie in movieList" v-on:movieData="displayOverlay" :search="movie.title" />
      <h1 class="movies__headline" v-if="movieRec.length"> You may also like </h1>
      <Movie v-for="movie in movieRec" v-on:movieData="displayOverlay" :search="movie.title" />
    </div>
      <button @click="test">more</button>
  </div>
</template>

<script>
import yts from '@/api/yts'
import Movie from '@/components/Movie'
import Search from '@/components/Search'
import Navi from '@/components/Navi'
import Overlay from '@/components/Overlay'

export default {
  name: 'Home',
  components: { Movie, Search, Navi, Overlay },
  data() {
    return {
      movie: [],
      movieList: [],
      movieRec: [],
      movieData: {},
      headline: 'New Releases',
      active: false
    }
  },
  methods: {
    // TODO Testing generator...
    // MovieRec or MovieList ?
    // Youtube trailer
    async test(msg) {
      const list = await yts.list()
      list.data.data.movies.map(movie => this.movieList.push(movie))
    },
    async search(query) {
      this.headline = `Search results for '${query}'`

      const list = await yts.search(query)
      this.movieList = list.data.data.movies
      if (query.length === 0) {
        this.movieRec = []
        return this.headline = 'New Releases'
      }

      // reccomendation logic
      const genres = list.data.data.movies[0].genres
      const random = genres[Math.floor(Math.random() * genres.length)]

      const rec = await yts.searchByGenre(random)

      // optimize (?)
      const filt = rec.data.data.movies.filter(movR => {
        return !list.data.data.movies.some(movL => {
          return movR.id === movL.id
        })
      })

      this.movieRec = filt
    },
    displayOverlay(movie) {
      this.movieData = movie
      this.active = !this.active
    },
  },
  async created() {
    // TODO works -- gen ref
    const list = await yts.list()
    this.movieList = list.data.data.movies
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

  grid-row-gap: 2rem;

  overflow-y: auto;
  overflow-x: hidden;

  position: relative;
}

.movies__headline {
  grid-column: 1 / -1;
  color: rgb(var(--grey));
  justify-self: start;
  font-weight: 200;
  padding: 5rem 1.5rem;
}

.btn {
  padding: .5rem 3rem;
  background: rgb(var(--white));
  color: rgb(var(--pink));
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
}
</style>
