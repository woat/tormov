<template>
  <div class="home">
    <Search class="search" v-on:sendSearch="search"/>
    <Navi class="navi" v-on:view="view" v-on:genre="searchGenre"/>
    <div v-on:scroll="bottomScroll" class="movies">
      <Overlay :movie="movieData" :active="active" v-on:active="displayOverlay" />
      <h1 class="movies__headline">{{ headline }}</h1>
      <Movie v-for="movie in movieList" v-on:movieData="displayOverlay" :search="movie.title" />
      <h1 class="movies__headline" v-if="movieRec.length"> You may also like </h1>
      <Movie v-for="movie in movieRec" v-on:movieData="displayOverlay" :search="movie.title" />
      <h1 class="movies__headline movies__headline--loading" v-if="loading"><i class="fas fa-spinner fa-pulse"></i></h1>
    </div>
  </div>
</template>

<script>
import yts from '@/api/yts'
import Movie from '@/components/Movie'
import Search from '@/components/Search'
import Navi from '@/components/Navi'
import Overlay from '@/components/Overlay'
import h from '@/modules/helpers'

export default {
  name: 'Home',
  components: { Movie, Search, Navi, Overlay },
  data() {
    return {
      // movie: [],
      movieList: [],
      movieRec: [],
      movieData: {},
      headline: 'New Releases',
      active: false,
      loading: false
    }
  },
  methods: {
    resetList() {
      this.movieList = []
    },
    searchGenre({ genre, cb }) {
      this.headline = `Displaying ${genre} movies`
      cb(this, yts)
    },
    // MovieRec or MovieList ?
    // Hotlink overlay
    bottomScroll({ target: e }) {
      // Check to see if we are already loading
      // Start loading 100px from the bottom
      // Show loading animation
      if (e.scrollHeight - e.scrollTop < e.clientHeight + 100 && this.loading === false) {
        this.addMoreMovies()
      }
    },
    async addMoreMovies() {
      this.loading = true

      // Genres
      if (this.$route.query.genre) {
        const genresList = this.$route.query.genre.split(' ')
        const movies = await h.getMoviesByGenre(genresList, yts, 'searchByGenre')

        while (movies.length < 20) {
          const more = await h.getMoviesByGenre(genresList, yts, 'searchByGenre', this.$store.state.genrePage)
          more.forEach(movie => movies.push(movie))
          console.log(this.$store.state.genrePage)
          this.$store.commit('increment')
        }

        movies.forEach(movie => this.movieList.push(movie))
        return this.loading = false
      }

      // Default
      const list = await yts.list().then(data => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.loading = false
            resolve(data)
          }, 1500)
        })
      })

      if (this.movieRec.length) {
        // TODO This needs to be movie reccomendation instead of random ones
        return list.data.data.movies.forEach(movie => this.movieRec.push(movie))
      }
      list.data.data.movies.forEach(movie => this.movieList.push(movie))
    },
    async search(query) {
      this.headline = `Search results for '${query}'`

      const list = await yts.search(query)
      this.movieList = list.data.data.movies

      if (typeof this.movieList === 'undefined') {
        return this.headline = `No results found for '${query}'`
      }
      if (query.length === 0) {
        this.movieRec = []
        return this.headline = 'New Releases'
      }

      // reccomendation logic
      const { genres } = list.data.data.movies[0]
      const random = genres[Math.floor(Math.random() * genres.length)]

      const rec = await yts.searchByGenre(random)

      // remove duplicates -- optimize (?)
      const filt = rec.data.data.movies.filter(movR => {
        return !list.data.data.movies.some(movL => {
          return movR.id === movL.id
        })
      })

      this.movieRec = filt
    },
    async view({ headline, cb }) {
      this.headline = headline
      cb(this, yts)
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
    if (!!this.$route.query.search) this.search(this.$route.query.search)
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
  overflow-y: scroll;
}

.movies {
  display: grid;
  grid-area: movies;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  grid-gap: 2rem;
  justify-items: center;

  grid-row-gap: 2rem;

  overflow-y: scroll;
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

.movies__headline--loading {
  justify-self: center;
}

.btn {
  padding: .5rem 3rem;
  background: rgb(var(--white));
  color: rgb(var(--pink));
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  box-shadow: .4rem .4rem 0 rgb(var(--red));
  cursor: pointer;
  backface-visibility: hidden;
  transition: all .1s ease;
}

.btn:hover {
  transform: translateY(-.2rem);
  box-shadow: .4rem .6rem 0 rgb(var(--red));
}

.btn:active {
  transform: translateY(.1rem);
  box-shadow: .2rem .2rem 0 rgb(var(--red));
}

.btn--blue {
  color: rgb(var(--darkblue));
  box-shadow: .4rem .4rem 0 rgb(var(--darkblue));
}

.btn--blue:hover {
  box-shadow: .4rem .6rem 0 rgb(var(--darkblue));
}

.btn--blue:active {
  box-shadow: .2rem .2rem 0 rgb(var(--darkblue));
}

</style>
