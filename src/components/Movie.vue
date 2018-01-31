<template>
  <div class="movie" v-if="display">
    <div class="movie__card">
      <div class="movie__poster">
        <span class="movie__score">{{ movieScore }}</span>
        <div class="movie__poster--overlay">
          <button class="btn" @click="displayOverlay">View</button>
        </div>
        <img class="movie__poster--image" :src="movie.poster" />
      </div>
      <div class="movie__sub">
        <h3>{{ movie.title }}</h3>
        <h4>{{ movie.genres }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import yts from '@/api/yts'
const imdb = require('imdb-api')

export default {
  name: 'Movie',
  props: ['search'],
  data () {
    return {
      movie: {},
      display: true
    }
  },
  methods: {
    async searchMovie() {
      try {
        await imdb.get(this.search, {apiKey: process.env.API_KEY })
          .then(data => {
            this.movie = data
          })
        // If no poster use a placeholder -- try yts?
        if (this.movie.poster === "N/A") {
          this.movie.poster = 'http://via.placeholder.com/220x300'
        }
        const torrent = await yts.search(this.movie.imdbid)
        this.movie.torrenturl = torrent.data.data.movies[0].torrents[0].url
        this.movie.yt = `https://www.youtube.com/watch?v=${torrent.data.data.movies[0].yt_trailer_code}`
      } catch(err) {
        this.display = false
        console.log(err)
      }
    },
    displayOverlay() {
      this.$emit('movieData', this.movie)
    }
  },
  watch: {
    /*
      Component rerenders when given search query via props
    */
    search() {
      this.searchMovie()
    }
  },
  computed: {
    movieScore() {
      return this.movie.rating
    }
  },
  created() {
    this.searchMovie()
  }
}
</script>

<style scoped>
.movie {
}

.movie__card {
  display: grid;
  position: relative;
}

.movie__score {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(var(--blue), 1);
  padding: .5rem 1.5rem;
  font-weight: 600;
  border-radius: 4rem;
  box-shadow: 0 1rem 2rem rgba(0,0,0, .4);
  z-index: 999;
  color: rgb(var(--white));

  transition: all 0.3s;
}

.movie__poster {
  overflow: hidden;
  display: grid;
  grid-template: 1 / 1;
  box-shadow: 0 1rem 3rem rgba(var(--grey), .6);
}

.movie__poster--overlay {
  grid-area: 1 / 1;
  background: rgba(var(--pink), .5);
  clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 0.3s;
  transform: translateY(100%);
}

.movie__poster--image {
  grid-area: 1 / 1;
  min-width: 22rem;
  max-height: 30rem;
  transition: all 0.3s;
}

.movie__poster:hover .movie__poster--overlay {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  transform: translateY(0%);
}

.movie__poster:hover .movie__score {
  background-color: rgba(var(--pink), 1);
}

.movie__sub {
  display: grid;
  justify-items: start;
  margin-top: 2rem;
}

.movie__sub > h3 {
  width: 22rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie__sub > h4 {
  color: rgb(var(--blue));
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
